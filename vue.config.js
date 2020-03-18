module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("gql")
      .test(/\.(gql|graphql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  }
};
