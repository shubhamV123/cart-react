import React from 'react'
import { Grid } from 'semantic-ui-react'

import Product from './Product'

const ProductList = ({ products, updateSelected }) => {
    return (
        <Grid centered>
            {products.map((product, index) => {
                return (
                    <Grid.Column mobile={8} tablet={8} computer={4} key={index}>
                        <Product
                            product={product}
                            updateSelected={updateSelected}
                        />
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

export default ProductList
