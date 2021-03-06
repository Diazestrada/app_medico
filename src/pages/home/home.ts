import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { MenuProvider } from '../../providers/menu/menu';
import { UtilityProvider } from '../../providers/utility/utility';
import { SessionProvider } from '../../providers/session/session';
import { HomeAppPage } from '../home-app/home-app';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  title: string = "Inicio";

  @ViewChild('carousel') slideCarousel: Slides;
  @ViewChild('menu') slideMenu: Slides;

  imgs: any = [
    {
      nombre: '../../assets/img/noticias/noticia_01.jpg',
      url:"servicios-especiales/",
    },
    {
      nombre: "../../assets/img/noticias/noticia_02.jpg",
      url:"wp-content/uploads/2019/06/DIRECTORIO_MEDICOS-ESPECIALISTAS.pdf",
    },
    {
      nombre: "../../assets/img/noticias/noticia_03.jpg",
      url:"laboratorio-clinico/",
    },
    {
      nombre: "../../assets/img/noticias/noticia_04.jpg",
      url:"imagenologia/",
    }
  ];

  menus: any;
  subMenu: any;
  subMenuTwo: any;
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertProvider: AlertProvider,
    public menuProvider: MenuProvider,
    private events: Events,
    private utilityProvider: UtilityProvider,
    private sessionProvider: SessionProvider
  ) {
    this.initMenu();
    this.sessionProvider.getInfoUsuario().then((val: any) => {
      this.usuario = val;
      if(this.usuario != null){
        this.title =  val.nombre1 + " " + val.apellido1; 
      }
    });
  }

  ngAfterViewInit() {
    this.slideCarousel.effect = "slide"; //slide, fade, cube, coverflow or flip
    this.slideCarousel.loop = true;
    this.slideCarousel.speed = 3000;
    this.slideCarousel.autoplay = 3000;

    this.slideMenu.lockSwipeToNext(true);
    this.slideMenu.lockSwipeToPrev(true);
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : initMenu
    Descripcion : Inicializar componentes de menu
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  initMenu() {
    this.events.publish('user:onLogIn');    
    this.menuProvider.getMenu(false).then(res => {
      this.menus = res;
      console.log(this.menus);
    }, error => {
      console.log(error);
    });
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : goTo
    Descripcion : Cargar submenus o Ir al componente
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  goTo(menu: any) {
    this.navCtrl.push(menu.component);
  }

  /*--------------------------------------------------------------------------------
  Copyright Iteria SAS - Colombia
  Procedimiento : logOut
  Descripcion : Cerrar la sesión
  Autor : Andres Velasco (andres.velasco@iteria.com.co)
  Fecha : 30/11/2018
 ----------------------------------------------------------------------------------
  Historia de Modificaciones
 ----------------------------------------------------------------------------------
  Fecha Autor Modificacion
 --------------------------------------------------------------------------------*/
  logOut() {
    //Modal de carga
    let showLoading = this.utilityProvider.showLoadingText();
    showLoading.present();

    this.sessionProvider.signOut().then(res => {
      setTimeout(() => {
        this.navCtrl.setRoot(HomeAppPage);
        showLoading.dismiss();
      }, 1000);
    });
  }

  //Funcion que permite abrir links de los banners
  abrirLink(urlImag: any){
    let urlCompleta = 'https://christussinergia.com/'+urlImag.url;
    window.open(urlCompleta, '_system', 'location=yes');
  }
}
