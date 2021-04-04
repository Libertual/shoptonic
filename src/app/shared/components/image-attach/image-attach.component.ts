import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Integer from '@zxing/library/esm/core/util/Integer';

@Component({
  selector: 'app-image-attach',
  templateUrl: './image-attach.component.html'
})
export class ImageAttachComponent implements OnInit {
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured: boolean;
  cameras: MediaDeviceInfo[] = [];

  stream: MediaStream
  imageSelectedIndex = 0;
  cameraSelectedIndex = 0;

  text: string = '';

  HEIGHT = 0;
  WIDTH = 0;

  constructor(
    public dialogRef: MatDialogRef<ImageAttachComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // const win = window;
    window.addEventListener("orientationchange", $event => {
      this.setSizeParams();
    }, false);
   }

   /**
    * Auto set video size params
    */
   public setSizeParams(): void {
      this.WIDTH = parseInt((window.outerWidth * 0.5).toString(), 10);
      this.HEIGHT = parseInt((window.outerHeight * 0.5).toString(), 10);
   }

  async ngOnInit() {
    
    this.setSizeParams();

    await this.setupDevices();
    
    this.dialogRef.afterClosed().subscribe(data => {
      this.video.nativeElement.pause();
    });
  }

  /**
   * setupDevices
   */
  async setupDevices(): Promise<void> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter(device => device.kind === 'videoinput');
      this.cameraSelectedIndex = this.getBackCameraIndex();
      
      this.setupDevice(this.cameras[this.cameraSelectedIndex != -1 ? this.cameraSelectedIndex: 0]);
    }
  }

  /**
   * getBackCameraIndex
   */
  public getBackCameraIndex(): number {
    return this.cameras.findIndex(cam => cam.label.includes('back')) || 0;
  }

  private async setupDevice(camera: MediaDeviceInfo): Promise<void> {
    const deviceConfig = {
      video: {
          width: this.WIDTH || 640,
          height: this.HEIGHT || 480,
          facingMode: "environment", /* may not work, see https://bugs.chromium.org/p/chromium/issues/detail?id=290161 */
          deviceId: null
      }
    };
    deviceConfig.video.deviceId = camera.deviceId;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(deviceConfig);
      if (this.stream) {
        this.video.nativeElement.srcObject = this.stream;
        
        
        console.log('medidas', this.video.nativeElement.videoWidth + ' x ' + this.video.nativeElement.videoHeight);
        this.video.nativeElement.play();
        this.text = 'Medidasv: ' + this.stream.getVideoTracks()[0].getSettings().width + ' x ' + this.stream.getVideoTracks()[0].getSettings().height;
        this.error = null;
        this.WIDTH = this.stream.getVideoTracks()[0].getSettings().width;
        this.HEIGHT = this.stream.getVideoTracks()[0].getSettings().height;
      } else {
        this.error = "You have no output video device";
      }
    } catch (e) {
      this.error = e;
    }
  }

  captureImage(): void {
    this.WIDTH = this.stream.getVideoTracks()[0].getSettings().width;
    this.HEIGHT = this.stream.getVideoTracks()[0].getSettings().height;
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png")); // TODO: Guardar solo una captura
    this.setPhoto(this.captures.length - 1);
  }

  removeCurrent(): void {
    this.isCaptured = false;
  }

  public setPhoto(idx: number): void {
    console.log('medidas', this.video.nativeElement.videoWidth + ' x ' + this.video.nativeElement.videoHeight);
    this.text = 'Medidas: ' + this.video.nativeElement.videoWidth + ' x ' + this.video.nativeElement.videoHeight;
    this.isCaptured = true;
    var image = new Image();
    this.imageSelectedIndex = idx;
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any): void {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT, 0, 0, this.WIDTH, this.HEIGHT);
  }

  public save(): void {
    this.dialogRef.close(this.captures[this.imageSelectedIndex]);
  }

  public toggleTorch(): void {
    this.stream.getVideoTracks[0].applyConstraints({
      advanced: [{ torch: true }]
    });
  }
  /**
   * toggleCamera
   */
  public async toggleCamera() {
    this.cameraSelectedIndex ++;
    this.text = this.cameras.length.toString();
    if( this.cameraSelectedIndex === this.cameras.length) this.cameraSelectedIndex = 0;
    await this.setupDevice(this.cameras[this.cameraSelectedIndex]);
  }
}

