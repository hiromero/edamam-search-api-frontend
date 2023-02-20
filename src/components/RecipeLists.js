import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CiPizza } from 'react-icons/ci';
import { GiCheckMark, GiFruitBowl, GiNoodles } from 'react-icons/gi';
import { MdOutlineIcecream } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { fetchData, fetchTabData } from '../service';
import Button from './Button';
import "./Pagination.css";


function RecipeLists() {
    //Recipe Search
    const [searchedTerm, setSearchTerm] = useState();
    const query = 'fruit'
    const [data, setData] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 3;


    const searchRecipe = (searchQuery) => {
        fetchData(searchedTerm).then((response) => {
            setData(response);
            console.log(response);
        })
    }


    useEffect(() => {
        fetchData(query).then((response) => {
            setData(response);
            console.log(response);
        })
    }, [])

    const handlePageClick = ({ selected: selectedPage }) => {
        console.log("selectedPage", selectedPage);
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * PER_PAGE;

    const currentPageData = Object.values(data && data.hits)
        .slice(offset, offset + PER_PAGE)
        .map((res, index) =>
            <div key={index} className='flexItem'>
                <div className='img-wrapper'>
                    <img onClick={() => handleItemClick(res._links.self.href.match(/\/([^\/?]+)\?/)[1])} src={res.recipe.image} alt={res.recipe.label} />
                </div>
                <p onClick={() => handleItemClick(res._links.self.href.match(/\/([^\/?]+)\?/)[1])}>{res.recipe.label}</p>
            </div>
        );
    console.log(currentPageData);

    //const pageCount = Math.ceil(data.hits.length / PER_PAGE);
    //const pageCount = Math.ceil(Object.keys(data.hits).length / PER_PAGE);
    const pageCount = 7


    //Specific Recipe Info data && data.hits
    const [active, setActive] = useState('Pizza')
    const [tabData, setTabData] = useState('')
    const [tabLabel, setTabLabel] = useState([
        {
            name: 'Pizza',
            icon: <CiPizza />,
            id: '0209cb28fc05320434e2916988f47b71'
        },
        {
            name: 'Noodles',
            icon: <GiNoodles />,
            id: 'a243e3cd56da95b31e5a86ef52578908'
        },
        {
            name: 'Deserts',
            icon: <GiFruitBowl />,
            id: 'bc865476ffe2b8a03fbe9aee2f739740'
        },
        {
            name: 'Ice Cream',
            icon: <MdOutlineIcecream />,
            id: '2283c0cc62744caa729a678f4080bd42'
        },
    ])

    const handleClick = (name, id) => {
        setActive(name)
        fetchTabData(id).then((response) => {
            setTabData(response);
            console.log(response);
        })
    }

    const handleItemClick = (id) => {
        fetchTabData(id).then((response) => {
            setTabData(response);
            //console.log(response);
        })
    }

    useEffect(() => {
        fetchTabData(tabLabel[0].id).then((response) => {
            setTabData(response);
            console.log(response);
        })
    }, [])

    return (
        <div>
            <div className="container">
                <h1 className='recipeHeading'>Presearch</h1>
                <div className="tabs">
                    {
                        tabLabel.map((item, index) => (
                            <div onClick={() => handleClick(item.name, item.id)} key={index} className={`tablist ${active === item.name ? 'active' : ""}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='recipe_banner'>
                    {tabData !== '' && <>
                        <div className="left-col">
                            <span className='badge'>{tabData.recipe.cuisineType[0].toUpperCase()}</span>
                            <Button />
                            <h1>{tabData.recipe.label}</h1>
                            <p><strong>Recipe by:</strong><small>{tabData.recipe.source}</small></p>
                            <h3>Ingredients</h3>
                            <div className='ingredients'>
                                <ul>
                                    {tabData.recipe.ingredientLines.map((list, index) =>
                                        (<li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>)
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="image-wrapper">
                                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
                            </div>
                        </div>
                    </>}
                </div>
            </div>

            <div className='container'>
                <div className='heading-line'>
                    <strong>Search Recipes</strong>
                    <div className='input-wrapper' >
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchedTerm}
                            type="text"
                            placeholder='Type Recipe here' />
                        <button onClick={() => searchRecipe(searchedTerm)} ><BsSearch /></button>
                    </div>
                </div>

                <div div className='flexbox'>
                    {currentPageData}
                </div>
                <ReactPaginate
                    previousLabel={"<=Previous"}
                    nextLabel={"Next=>"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"paginatin__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </div>
        </div>
    )
}

export default RecipeLists
