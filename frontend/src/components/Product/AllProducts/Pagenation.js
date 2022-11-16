import React, { Fragment} from 'react'
import Pagenation from "react-js-pagination";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PagenationBox = ({currentPage,resultPerPage,productCounts,setCurrentPageNo}) => {

    return (
        <Fragment>
            <Pagenation
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCounts}
                onChange={setCurrentPageNo}
                nextPageText={<ArrowForwardIosIcon />}
                prevPageText={<ArrowBackIosIcon />}
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"

            />
        </Fragment>
    )
}

export default PagenationBox;