import AbstractView from '../framework/view/abstract-view.js';

const createLoadingTemplate = () => (
  `<main class="main">
     <section class="films">
     <section class="films-list">
       <h2 class="films-list__title">Loading...</h2>
     </section>
     </section>
   </main>`);

export default class LoadingView extends AbstractView{
  get template() {
    return createLoadingTemplate();
  }
}
