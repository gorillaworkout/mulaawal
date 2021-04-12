export const API_URL=`https://staging.awalmula.co.id/rest/default/V1/products?searchCriteria[pageSize]=10`


export const priceFormatter = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
};
