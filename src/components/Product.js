import React, { Component } from 'react'
import { Card, Icon, Image, Button, Input } from 'semantic-ui-react'

class Product extends Component {
    state = {
        value: 0,
        isAdded: false,
    }

    updateParentInfo = () => {
        this.props.updateSelected({
            ...this.props.product,
            qty: this.state.value,
        })
    }
    increment = (e) => {
        this.setState((prevState) => ({
            value: Number(prevState.value) + 1,
        }))
        e.preventDefault()
    }
    decrement = (e) => {
        e.preventDefault()
        if (this.state.value <= 0) {
            return this.state.value
        } else {
            this.setState((prevState) => ({
                value: Number(prevState.value) - 1,
            }))
        }
    }

    onAddToCartClick = () => {
        this.updateParentInfo()
        this.setState({ isAdded: true })
        this.timer = setTimeout(() => {
            this.setState({ isAdded: false })
        }, 3500)
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value.replace(/\D/, '') })
    }

    render() {
        const { image, name, category, price } = this.props.product
        const { isAdded } = this.state

        return (
            <Card>
                <Image src={image} wrapped ui={false} />
                <Card.Content textAlign="center">
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{category}</Card.Meta>
                    <Card.Description>&#8377;{price}</Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    <Button
                        circular
                        icon="minus"
                        disabled={this.state.value === 0}
                        onClick={this.decrement}
                    />
                    &nbsp;
                    <Input
                        size="small"
                        style={{ width: '4em' }}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    &nbsp;
                    <Button circular icon="add" onClick={this.increment} />
                    <Button
                        color={isAdded ? 'orange' : 'green'}
                        icon
                        labelPosition="right"
                        style={{ marginTop: '1rem' }}
                        onClick={this.onAddToCartClick}
                        disabled={this.state.value <= 0}
                    >
                        {isAdded ? 'Successfully added' : 'Add to cart'}
                        <Icon name={isAdded ? 'checkmark' : 'add'} />
                    </Button>
                </Card.Content>
            </Card>
        )
    }
}

export default Product
