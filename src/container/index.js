import React from 'react'
import { Container, Loader, Dimmer, Message } from 'semantic-ui-react'

//Our components
import ProductList from '../components/ProductList'
import Header from '../components/Header'
import CartModal from '../components/CartModal'

class Layout extends React.Component {
    state = {
        products: [],
        loading: true,
        error: false,
        selectedItems: [],
        cartMetaInfo: {
            qty: 0,
            price: 0,
        },
        isCartOpen: false,
    }

    componentDidMount() {
        this.fetchProducts()
    }

    fetchProducts = async () => {
        try {
            const response = await fetch(
                'https://shubhamv123.github.io/vegetable-fruit/products.json'
            )
            const data = await response.json()
            this.setState({
                products: data.products,
                productToRender: data.products,
                loading: false,
            })
        } catch (e) {
            console.log('SOMETHING WENT WRONG')
            this.setState({ error: true, loading: false })
        }
    }

    calculateTotalQtyAndPrice = () => {
        let total = this.state.selectedItems.reduce(
            (prev, next) => ({
                qty: prev.qty + next.qty,
                price: prev.price + next.price * next.qty,
            }),
            {
                qty: 0,
                price: 0,
            }
        )
        this.setState({ cartMetaInfo: total })
    }

    updateSelected = (product) => {
        //Check product is already there in selected item
        const isProductSelected = this.state.selectedItems.find(
            (data) => data.id === product.id
        )
        let selectedItems = [...this.state.selectedItems]
        if (isProductSelected) {
            selectedItems = selectedItems.map((data) => {
                if (data.id === product.id) {
                    return product
                }
                return data
            })
        } else {
            selectedItems.push(product)
        }
        this.setState(
            {
                selectedItems,
            },
            () => {
                //Update quantity (add in callback so that is make sure selectedItem is already updated first)
                this.calculateTotalQtyAndPrice()
            }
        )
    }

    totalItemsInCart = () => {
        let items = 0
        this.state.selectedItems.forEach((item) => {
            if (item.qty > 0) {
                items += 1
            }
        })
        return items
    }

    toggleCart = () => {
        this.setState({ isCartOpen: !this.state.isCartOpen })
    }

    removeItemsFromCart = (id) => {
        const updatedItems = this.state.selectedItems.filter(
            (data) => data.id !== id
        )
        this.setState({ selectedItems: updatedItems }, () => {
            this.calculateTotalQtyAndPrice()
        })
    }

    filterItems = (val) => {
        const products = this.state.products.filter((data) => {
            return data.name.toLowerCase().includes(val.toLowerCase())
        })

        this.setState({ productToRender: products })
    }

    onCheckout = () => {
        alert('Order successfully place')
        this.setState({
            productToRender: this.state.products,
            isCartOpen: false,
            selectedItems: [],
            cartMetaInfo: {
                qty: 0,
                price: 0,
            },
        })
    }

    render() {
        let noDataFoundMessage
        const {
            loading,
            productToRender,
            error,
            cartMetaInfo: { qty, price },
            selectedItems,
        } = this.state
        if (loading) {
            return (
                <Dimmer active={loading}>
                    <Loader>Loading</Loader>
                </Dimmer>
            )
        }
        if (error) {
            return <Container>Something went wrong</Container>
        }

        if (this.state.productToRender.length === 0 && !this.state.loading) {
            noDataFoundMessage = (
                <Message>
                    <Message.Header>No data found</Message.Header>
                    <p>
                        Looks like no data found. Either you searched wrong
                        string or api is giving error. Try again
                    </p>
                </Message>
            )
        }
        return (
            <Container style={{ margin: '1.5rem 0' }}>
                <Header
                    totalCartPrice={price}
                    itemsInCart={this.totalItemsInCart()}
                    toggleCart={this.toggleCart}
                    filterItems={this.filterItems}
                />
                <ProductList
                    products={productToRender}
                    updateSelected={this.updateSelected}
                />
                {noDataFoundMessage}

                <CartModal
                    items={selectedItems}
                    open={this.state.isCartOpen}
                    toggleCart={this.toggleCart}
                    qtySelected={qty}
                    totalCartPrice={price}
                    removeItemsFromCart={this.removeItemsFromCart}
                    onCheckout={this.onCheckout}
                />
            </Container>
        )
    }
}

export default Layout
