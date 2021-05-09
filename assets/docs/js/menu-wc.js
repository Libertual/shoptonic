'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Angular -&gt; Shoptonic</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountModule-ed32057e3b6a1a1bcb400b0a2f007868"' : 'data-target="#xs-components-links-module-AccountModule-ed32057e3b6a1a1bcb400b0a2f007868"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountModule-ed32057e3b6a1a1bcb400b0a2f007868"' :
                                            'id="xs-components-links-module-AccountModule-ed32057e3b6a1a1bcb400b0a2f007868"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountRoutingModule.html" data-type="entity-link">AccountRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-908953d7fee369fa978414ea489c4620"' : 'data-target="#xs-components-links-module-AppModule-908953d7fee369fa978414ea489c4620"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-908953d7fee369fa978414ea489c4620"' :
                                            'id="xs-components-links-module-AppModule-908953d7fee369fa978414ea489c4620"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-3a4ac8311061fca8be946f30a92bef03"' : 'data-target="#xs-components-links-module-CoreModule-3a4ac8311061fca8be946f30a92bef03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-3a4ac8311061fca8be946f30a92bef03"' :
                                            'id="xs-components-links-module-CoreModule-3a4ac8311061fca8be946f30a92bef03"' }>
                                            <li class="link">
                                                <a href="components/AlertComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceModule.html" data-type="entity-link">FinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FinanceModule-331e72e9f292b650d78cc670091ecac9"' : 'data-target="#xs-components-links-module-FinanceModule-331e72e9f292b650d78cc670091ecac9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceModule-331e72e9f292b650d78cc670091ecac9"' :
                                            'id="xs-components-links-module-FinanceModule-331e72e9f292b650d78cc670091ecac9"' }>
                                            <li class="link">
                                                <a href="components/FinanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FinanceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceRoutingModule.html" data-type="entity-link">FinanceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-8d7e9ec3aa022e4db4bf10aaf8d61227"' : 'data-target="#xs-components-links-module-HomeModule-8d7e9ec3aa022e4db4bf10aaf8d61227"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-8d7e9ec3aa022e4db4bf10aaf8d61227"' :
                                            'id="xs-components-links-module-HomeModule-8d7e9ec3aa022e4db4bf10aaf8d61227"' }>
                                            <li class="link">
                                                <a href="components/AlertComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ItemModule.html" data-type="entity-link">ItemModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ListModule.html" data-type="entity-link">ListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ListModule-dbf2cddc9260689a55d5f27456dc98ad"' : 'data-target="#xs-components-links-module-ListModule-dbf2cddc9260689a55d5f27456dc98ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListModule-dbf2cddc9260689a55d5f27456dc98ad"' :
                                            'id="xs-components-links-module-ListModule-dbf2cddc9260689a55d5f27456dc98ad"' }>
                                            <li class="link">
                                                <a href="components/ListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListItemDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListItemDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShareComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShareComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListRoutingModule.html" data-type="entity-link">ListRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OpenFoodFactsModule.html" data-type="entity-link">OpenFoodFactsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ScannerModule.html" data-type="entity-link">ScannerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScannerModule-ddb6c6b6bce789d7d6ea5820c4eaec75"' : 'data-target="#xs-components-links-module-ScannerModule-ddb6c6b6bce789d7d6ea5820c4eaec75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScannerModule-ddb6c6b6bce789d7d6ea5820c4eaec75"' :
                                            'id="xs-components-links-module-ScannerModule-ddb6c6b6bce789d7d6ea5820c4eaec75"' }>
                                            <li class="link">
                                                <a href="components/ScannerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScannerDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScannerDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScannerRoutingModule.html" data-type="entity-link">ScannerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-17aa7ff7d02c0e6d66431930399ef2b8"' : 'data-target="#xs-components-links-module-SharedModule-17aa7ff7d02c0e6d66431930399ef2b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-17aa7ff7d02c0e6d66431930399ef2b8"' :
                                            'id="xs-components-links-module-SharedModule-17aa7ff7d02c0e6d66431930399ef2b8"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImageAttachComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageAttachComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListGalleryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListGalleryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ItemComponent.html" data-type="entity-link">ItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationBarComponent.html" data-type="entity-link">NavigationBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent.html" data-type="entity-link">SidenavComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Alert.html" data-type="entity-link">Alert</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Item.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemDTO.html" data-type="entity-link">ItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListItem.html" data-type="entity-link">ListItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponse.html" data-type="entity-link">LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link">AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinanceService.html" data-type="entity-link">FinanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link">HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemService.html" data-type="entity-link">ItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListService.html" data-type="entity-link">ListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpenFoodFactsService.html" data-type="entity-link">OpenFoodFactsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtInterceptor.html" data-type="entity-link">JwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Ticket.html" data-type="entity-link">Ticket</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});