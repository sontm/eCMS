import Backend from '../util/Backend';

export const CATE_GET_OK = 'CATE_GET_OK';
export const CATE_GET_ERR = 'CATE_GET_ERR';

export const actCategoryGet = () => (dispatch) => {
    Backend.getAllCategoriesName(
    response => {
        console.log("Get All Category")
        console.log(response.data)
        dispatch({
            type: CATE_GET_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Category error")
    }); 
}
