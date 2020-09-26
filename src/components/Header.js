import React from 'react'
import { Input, Grid, Label, Menu, Icon } from 'semantic-ui-react'

const Header = ({ totalCartPrice, itemsInCart, toggleCart, filterItems }) => {
    return (
        <Grid
            centered
            verticalAlign="middle"
            textAlign="center"
            style={{ marginBottom: '2rem' }}
        >
            <Grid.Column mobile={16} tablet={16} computer={9}>
                <Input
                    icon="search"
                    placeholder="Search..."
                    fluid
                    onChange={(e) => filterItems(e.target.value)}
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={3}>
                <Label style={{ float: 'left' }}>
                    <div>
                        No .of Items : {itemsInCart} <br />
                        Total Price : &#8377;{totalCartPrice}
                    </div>
                </Label>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
                <Menu compact onClick={toggleCart}>
                    <Menu.Item as="a">
                        <Icon name="shopping cart" /> Add to cart
                        <Label color="red" floating>
                            {itemsInCart}
                        </Label>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
        </Grid>
    )
}

export default Header
