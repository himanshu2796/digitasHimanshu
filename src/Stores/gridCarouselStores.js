import { action, makeObservable, observable } from 'mobx';

class GridCarouselStores {
    index = 0;
    gridPage = 1;
    gridView = true;
    carouselView = false;
    carouselPage = 1;
    constructor(){
        makeObservable(this,{
            index: observable,
            gridPage: observable,
            gridView: observable,
            carouselView: observable,
            carouselPage : observable,
            calcGridPage: action,
            calcCarouselPage:action,
            changeToCarousel:action,
            changeToGrid:action,
            getIndex: action
        });
    }
    calcGridPage (page) {
        this.gridPage = Math.ceil(page/20); 
    } 
    calcCarouselPage  (page) {
        this.carouselPage = (page-1)*20 + 1
    }
    changeToCarousel (page){
        this.gridView = false;
        this.gridPage = page;
        this.carouselPage = (page-1)*20 + 1

    }
    getIndex (index,page){
        this.gridView = false;
        this.index = index;
        this.gridPage = page;
    }
    changeToGrid (page){
        this.gridView = true;
        this.gridPage = page;
        
    }

}

const gridCarouselStore = new GridCarouselStores();
export default gridCarouselStore;