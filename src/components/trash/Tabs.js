import React, { useEffect, useState } from 'react'
import { CiPizza } from 'react-icons/ci'
import { GiCheckMark, GiFruitBowl, GiNoodles } from 'react-icons/gi'
import { MdOutlineIcecream } from 'react-icons/md'
import { fetchTabData } from '../../service'

function Tabs() {
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

    useEffect(() => {
        fetchTabData(tabLabel[0].id).then((response) => {
            setTabData(response);
            console.log(response);
        })
    }, [])

    return (
        <div className="container">
            <h1 className='recipeHeading'>What would you like to have!</h1>
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
    )
}

export default Tabs
