import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  const authorString = ` <div class="card" style="width: 18rem; background-color: black; color: white;">
  <div class="card-body">
    <h5 class="card-title card-text bold">${obj.favorite ? '<span><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}${obj.first_name} ${obj.last_name}</h5>
    <h6 class="card-subtitle mb-2">Author Email: <a href="mailto:${obj.email}">${obj.email}</a></h6>
    <hr>
    <i class="fas fa-edit btn btn-info" id="update-author--${obj.firebaseKey}"></i>
    <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i>
  </div>
</div>
`;

  renderToDOM('#view', authorString);

  let bookString = '';
  const array = obj.authorsBooks;
  array.forEach((item) => {
    bookString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
            <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`;
  });

  renderToDOM('#store', bookString);
};

export default viewAuthor;