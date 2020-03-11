exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  if (page.path.match(/^\/dashboard/)) {
    page.matchPath = '/dashboard/*';

    // update the page
    createPage(page);
  }
};
