(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"5nP1":function(t,e,i){"use strict";i.r(e),i.d(e,"ListModule",function(){return q});var s=i("ofXK"),a=i("PCNd"),n=i("tyNb"),c=i("0IaG"),r=i("fXoL"),o=i("bTqV");let b=(()=>{class t{constructor(t,e){this.dialogRef=t,this.data=e,this.message=e.message,this.title=e.title}ngOnInit(){}onDismiss(){this.dialogRef.close(!1)}onConfirm(){this.dialogRef.close(!0)}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(c.f),r.Kb(c.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-confirm-dialog"]],decls:10,vars:2,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions",""],["mat-button","","type","button",3,"click"],["mat-raised-button","","type","button","color","primary",3,"click"]],template:function(t,e){1&t&&(r.Pb(0,"h1",0),r.yc(1),r.Ob(),r.Pb(2,"div",1),r.Pb(3,"p"),r.yc(4),r.Ob(),r.Ob(),r.Pb(5,"div",2),r.Pb(6,"button",3),r.Wb("click",function(){return e.onDismiss()}),r.yc(7,"No"),r.Ob(),r.Pb(8,"button",4),r.Wb("click",function(){return e.onConfirm()}),r.yc(9,"Yes"),r.Ob(),r.Ob()),2&t&&(r.zb(1),r.Ac(" ",e.title,"\n"),r.zb(3),r.zc(e.message))},directives:[c.g,c.d,c.c,o.a],encapsulation:2}),t})();var l=i("3Pt+"),d=i("niax"),u=i("21no"),m=i("kmnG"),f=i("qFsG"),p=i("/1cH"),h=i("NFeN"),g=i("FKr1"),v=i("sYmb");function O(t,e){if(1&t&&(r.Pb(0,"mat-option",10),r.yc(1),r.Ob()),2&t){const t=e.$implicit;r.ec("value",t),r.zb(1),r.Bc(" ",t.username," - ",t.email," ")}}function P(t,e){1&t&&r.Lb(0,"span",11)}let y=(()=>{class t{constructor(t,e,i,s,a){this.formBuilder=t,this.accountService=e,this.listService=i,this.dialogRef=s,this.data=a,this.loading=!1,this.submitted=!1,this.usersFound=[],console.log("data",a),this.listId=a.listId}ngOnInit(){this.form=this.formBuilder.group({filter:[""],description:["",l.r.required]})}get f(){return this.form.controls}onSubmit(){console.log("submit",this.f.filter.value),this.f.filter.value._id&&this.listService.shareList(this.listId,this.f.filter.value).subscribe(t=>{console.log("response share user",t)})}onClose(){console.log("close"),this.dialogRef.close(!1)}getFilteredUsers(t){console.log(t),this.accountService.geFilteredUsers(t).subscribe(t=>{console.log("users",t),this.usersFound=t})}displayUser(t){return t&&t.username?t.username:""}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(l.c),r.Kb(d.a),r.Kb(u.a),r.Kb(c.f),r.Kb(c.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-share"]],decls:21,vars:15,consts:[[3,"formGroup","ngSubmit"],[1,"example-full-width"],["type","text","aria-label","Number","matInput","","formControlName","filter",3,"placeholder","matAutocomplete","input"],["autoActiveFirstOption","",3,"displayWith"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["type","submit","mat-button","",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["inline",""],["mat-button","","type","button",3,"click"],[3,"value"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,e){if(1&t&&(r.Pb(0,"h2"),r.yc(1),r.Zb(2,"translate"),r.Ob(),r.Pb(3,"form",0),r.Wb("ngSubmit",function(){return e.onSubmit()}),r.Pb(4,"mat-form-field",1),r.Pb(5,"input",2),r.Wb("input",function(t){return e.getFilteredUsers(t.target.value)}),r.Zb(6,"translate"),r.Ob(),r.Pb(7,"mat-autocomplete",3,4),r.xc(9,O,2,3,"mat-option",5),r.Ob(),r.Ob(),r.Pb(10,"div"),r.Pb(11,"button",6),r.xc(12,P,1,0,"span",7),r.yc(13),r.Zb(14,"translate"),r.Pb(15,"mat-icon",8),r.yc(16,"person_add"),r.Ob(),r.Ob(),r.Pb(17,"button",9),r.Wb("click",function(){return e.onClose()}),r.yc(18,"Cancel "),r.Pb(19,"mat-icon",8),r.yc(20,"cancel"),r.Ob(),r.Ob(),r.Ob(),r.Ob()),2&t){const t=r.lc(8);r.zb(1),r.zc(r.ac(2,9,"lists.share.title")),r.zb(2),r.ec("formGroup",e.form),r.zb(2),r.fc("placeholder",r.ac(6,11,"lists.share.field.usernameOrEmail")),r.ec("matAutocomplete",t),r.zb(2),r.ec("displayWith",e.displayUser),r.zb(2),r.ec("ngForOf",e.usersFound),r.zb(2),r.ec("disabled",e.loading),r.zb(1),r.ec("ngIf",e.loading),r.zb(1),r.Ac(" ",r.ac(14,13,"lists.share.button.send")," ")}},directives:[l.t,l.l,l.f,m.c,f.a,l.b,p.c,l.k,l.e,p.a,s.k,o.a,s.l,h.a,g.h],pipes:[v.c],encapsulation:2}),t})();class z{constructor(t,e){t&&(this.name=t),e&&(this.description=e)}}function _(t,e){1&t&&(r.Pb(0,"h2"),r.yc(1),r.Zb(2,"translate"),r.Ob()),2&t&&(r.zb(1),r.zc(r.ac(2,1,"lists.add")))}function I(t,e){1&t&&(r.Pb(0,"h2"),r.yc(1),r.Zb(2,"translate"),r.Ob()),2&t&&(r.zb(1),r.zc(r.ac(2,1,"lists.edit")))}function L(t,e){1&t&&(r.Pb(0,"div"),r.yc(1,"Name is required"),r.Ob())}function k(t,e){if(1&t&&(r.Pb(0,"div",10),r.xc(1,L,2,0,"div",0),r.Ob()),2&t){const t=r.Yb();r.zb(1),r.ec("ngIf",t.f.name.errors.required)}}function S(t,e){1&t&&r.Lb(0,"div",10)}function w(t,e){1&t&&r.Lb(0,"span",11)}const x=function(t){return{"is-invalid":t}};let F=(()=>{class t{constructor(t,e,i,s){this.listService=t,this.formBuilder=e,this.dialogRef=i,this.data=s,this.loading=!1,this.submitted=!1,this.list=s.list||new z,this.isAddMode=s.isAddMode}ngOnInit(){this.form=this.formBuilder.group({name:["",l.r.required],description:["",l.r.required]}),this.list._id&&(this.f.name.setValue(this.list.name),this.f.description.setValue(this.list.description))}get f(){return this.form.controls}onSubmit(){this.list.name=this.f.name.value,this.list.description=this.f.description.value,this.listService.addList(this.list).subscribe(t=>{this.dialogRef.close(t)})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(u.a),r.Kb(l.c),r.Kb(c.f),r.Kb(c.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-list-edit"]],decls:28,vars:22,consts:[[4,"ngIf"],[3,"formGroup","ngSubmit"],["for","name"],["matInput","","type","text","formControlName","name"],["class","invalid-feedback",4,"ngIf"],["for","description"],["matInput","","type","text","formControlName","description",3,"ngClass"],["type","submit","mat-button","",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["mat-button","","type","button",3,"click"],[1,"invalid-feedback"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,e){1&t&&(r.xc(0,_,3,3,"h2",0),r.xc(1,I,3,3,"h2",0),r.Pb(2,"form",1),r.Wb("ngSubmit",function(){return e.onSubmit()}),r.Pb(3,"div"),r.Pb(4,"mat-form-field"),r.Pb(5,"mat-label",2),r.yc(6),r.Zb(7,"translate"),r.Ob(),r.Lb(8,"input",3),r.xc(9,k,2,1,"div",4),r.Ob(),r.Pb(10,"mat-form-field"),r.Pb(11,"mat-label",5),r.yc(12),r.Zb(13,"translate"),r.Ob(),r.Lb(14,"input",6),r.xc(15,S,1,0,"div",4),r.Ob(),r.Ob(),r.Pb(16,"div"),r.Pb(17,"button",7),r.xc(18,w,1,0,"span",8),r.Pb(19,"mat-icon"),r.yc(20,"save"),r.Ob(),r.yc(21),r.Zb(22,"translate"),r.Ob(),r.Pb(23,"button",9),r.Wb("click",function(){return e.close()}),r.Pb(24,"mat-icon"),r.yc(25,"cancel"),r.Ob(),r.yc(26),r.Zb(27,"translate"),r.Ob(),r.Ob(),r.Ob()),2&t&&(r.ec("ngIf",e.isAddMode),r.zb(1),r.ec("ngIf",!e.isAddMode),r.zb(1),r.ec("formGroup",e.form),r.zb(4),r.zc(r.ac(7,12,"edit.name")),r.zb(3),r.ec("ngIf",e.submitted&&e.f.name.errors),r.zb(3),r.zc(r.ac(13,14,"edit.description")),r.zb(2),r.ec("ngClass",r.jc(20,x,e.submitted&&e.f.description.errors)),r.zb(1),r.ec("ngIf",e.submitted&&e.f.description.errors),r.zb(2),r.ec("disabled",e.loading),r.zb(1),r.ec("ngIf",e.loading),r.zb(3),r.Ac(" ",r.ac(22,16,"global.actions.save")," "),r.zb(5),r.Ac(" ",r.ac(27,18,"global.actions.cancel"),""))},directives:[s.l,l.t,l.l,l.f,m.c,m.f,f.a,l.b,l.k,l.e,s.j,o.a,h.a],pipes:[v.c],encapsulation:2}),t})();var A=i("AytR"),U=i("Wp6s"),C=i("STbY");function K(t,e){if(1&t&&r.Lb(0,"img",15),2&t){const t=r.Yb(2);r.gc("src","",t.apiUrl,"/images/default-user.jpg",r.pc)}}function W(t,e){if(1&t&&r.Lb(0,"img",15),2&t){const t=r.Yb().$implicit,e=r.Yb();r.hc("src","",e.apiUrl,"/images/",t.owner.avatar.filename,".",t.owner.avatar.fileExt,"",r.pc)}}function Y(t,e){if(1&t&&r.Lb(0,"img",18),2&t){const t=r.Yb(3);r.gc("src","",t.apiUrl,"/images/default-user.jpg",r.pc)}}function Z(t,e){if(1&t&&r.Lb(0,"img",18),2&t){const t=r.Yb().$implicit,e=r.Yb(2);r.hc("src","",e.apiUrl,"/images/",t.avatar.filename,".",t.avatar.fileExt,"",r.pc)}}function M(t,e){if(1&t&&(r.Pb(0,"div",16),r.xc(1,Y,1,1,"img",17),r.xc(2,Z,1,3,"img",17),r.Pb(3,"span"),r.yc(4),r.Ob(),r.Ob()),2&t){const t=e.$implicit;r.zb(1),r.ec("ngIf",!t.avatar),r.zb(1),r.ec("ngIf",t.avatar),r.zb(2),r.zc(t.username)}}const N=function(t){return[t]},E=function(){return{exact:!0}};function R(t,e){if(1&t){const t=r.Qb();r.Pb(0,"mat-card",4),r.Pb(1,"div"),r.Pb(2,"div",5),r.Pb(3,"div",6),r.Pb(4,"a",7),r.Pb(5,"mat-card-title"),r.yc(6),r.Ob(),r.Pb(7,"mat-card-subtitle"),r.yc(8),r.Ob(),r.Ob(),r.Ob(),r.Pb(9,"div",8),r.Pb(10,"span"),r.yc(11),r.Ob(),r.Pb(12,"button",9),r.Pb(13,"mat-icon"),r.yc(14,"more_vert"),r.Ob(),r.Ob(),r.Pb(15,"mat-menu",null,10),r.Pb(17,"button",11),r.Wb("click",function(){r.nc(t);const i=e.$implicit;return r.Yb().onEdit(i)}),r.Pb(18,"mat-icon"),r.yc(19,"edit"),r.Ob(),r.Pb(20,"span"),r.yc(21),r.Zb(22,"translate"),r.Ob(),r.Ob(),r.Pb(23,"button",11),r.Wb("click",function(){r.nc(t);const i=e.$implicit;return r.Yb().onDelete(i._id)}),r.Pb(24,"mat-icon"),r.yc(25,"delete"),r.Ob(),r.Pb(26,"span"),r.yc(27),r.Zb(28,"translate"),r.Ob(),r.Ob(),r.Pb(29,"button",11),r.Wb("click",function(){r.nc(t);const i=e.$implicit;return r.Yb().onShare(i._id)}),r.Pb(30,"mat-icon"),r.yc(31,"person_add"),r.Ob(),r.Pb(32,"span"),r.yc(33),r.Zb(34,"translate"),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Ob(),r.Pb(35,"mat-card-content"),r.Pb(36,"div",12),r.xc(37,K,1,1,"img",13),r.xc(38,W,1,3,"img",13),r.Pb(39,"span"),r.yc(40),r.Ob(),r.Ob(),r.xc(41,M,5,3,"div",14),r.Ob(),r.Ob()}if(2&t){const t=e.$implicit,i=r.lc(16);r.zb(4),r.ec("routerLink",r.jc(20,N,"/list/"+t._id))("routerLinkActiveOptions",r.ic(22,E)),r.zb(2),r.zc(t.name),r.zb(2),r.zc(t.description),r.zb(3),r.Bc(" ",t.cartItems?t.cartItems.length:0,"/",(t.listItems?t.listItems.length:0)+(t.cartItems?t.cartItems.length:0)," "),r.zb(1),r.ec("matMenuTriggerFor",i),r.zb(9),r.zc(r.ac(22,14,"global.actions.edit")),r.zb(6),r.zc(r.ac(28,16,"global.actions.delete")),r.zb(6),r.zc(r.ac(34,18,"global.actions.share")),r.zb(4),r.ec("ngIf",!t.owner.avatar),r.zb(1),r.ec("ngIf",t.owner.avatar),r.zb(2),r.zc(t.owner.username),r.zb(1),r.ec("ngForOf",t.sharedUsers)}}const j=[{path:"",component:(()=>{class t{constructor(t,e,i){this.dialog=t,this.listService=e,this.accountService=i,this.userLists=this.listService.userListsSubject,this.user=this.accountService.sessionValue.user,this.apiUrl=A.a.apiUrl,console.log("this.apiUrl",this.apiUrl)}ngOnInit(){this.listService.getUserList()}onEdit(t){this.dialog.open(F,{data:{list:t,isAddMode:!1}}).afterClosed().subscribe(t=>{this.listService.getUserList()})}onDelete(t){this.dialog.open(b,{data:{message:"Deseas borrar la lista",title:"Borrar lista"}}).afterClosed().subscribe(e=>{e?this.listService.deleteList(t).subscribe(t=>{this.listService.getUserList()}):console.log("closed without confirm")})}addList(){this.dialog.open(F,{data:{isAddMode:!0}}).afterClosed().subscribe(t=>{console.info("The list edit dialog was closed",t),this.listService.getUserList()})}onShare(t){this.dialog.open(y,{data:{listId:t}}).afterClosed().subscribe(t=>{console.info("The share dialog was closed",t),this.listService.getUserList()})}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(c.b),r.Kb(u.a),r.Kb(d.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-list-home"]],decls:7,vars:3,consts:[[1,"list-home"],["class","list-home__card",4,"ngFor","ngForOf"],[1,"list-home__add-button"],["mat-fab","","color","primary","aria-label","Add list",1,"mat-elevation-z6",3,"click"],[1,"list-home__card"],[1,"list-home__card-header"],[1,"list-home__card-header--title"],["routerLinkActive","active",3,"routerLink","routerLinkActiveOptions"],[1,"toolbar__right"],["mat-icon-button","",1,"toolbar__sidenav-button",3,"matMenuTriggerFor"],["actions","matMenu"],["mat-menu-item","",3,"click"],[1,"list-home__avatar","list-home__avatar--owner"],["class","list-home__avatar-img list-home__avatar-img--owner",3,"src",4,"ngIf"],["class","list-home__avatar list-home__avatar--shared-user",4,"ngFor","ngForOf"],[1,"list-home__avatar-img","list-home__avatar-img--owner",3,"src"],[1,"list-home__avatar","list-home__avatar--shared-user"],["class","list-home__avatar-img list-home__avatar-img--shared-user",3,"src",4,"ngIf"],[1,"list-home__avatar-img","list-home__avatar-img--shared-user",3,"src"]],template:function(t,e){1&t&&(r.Pb(0,"div",0),r.xc(1,R,42,23,"mat-card",1),r.Zb(2,"async"),r.Ob(),r.Pb(3,"div",2),r.Pb(4,"button",3),r.Wb("click",function(){return e.addList()}),r.Pb(5,"mat-icon"),r.yc(6,"add"),r.Ob(),r.Ob(),r.Ob()),2&t&&(r.zb(1),r.ec("ngForOf",r.ac(2,1,e.userLists)))},directives:[s.k,o.a,h.a,U.a,n.e,n.d,U.e,U.d,C.c,C.d,C.a,U.b,s.l],pipes:[s.b,v.c],encapsulation:2}),t})()}];let $=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(e){return new(e||t)},imports:[[n.f.forChild(j)],n.f]}),t})(),q=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(e){return new(e||t)},imports:[[s.c,a.a,$]]}),t})()}}]);