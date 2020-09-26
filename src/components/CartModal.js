import React from 'react'
import { Image, Icon, Button, Modal, Header, Table } from 'semantic-ui-react'

const CartModal = ({
    items,
    open,
    toggleCart,
    totalCartPrice,
    removeItemsFromCart,
    onCheckout,
}) => {
    return (
        <Modal open={open} closeIcon onClose={toggleCart}>
            <Header icon="shopping cart" content="My Cart" />
            <Modal.Content style={{ height: '25em', overflowY: 'auto' }}>
                <Table basic unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {items.map((cart) => (
                            <Table.Row key={cart.id}>
                                <Table.Cell>
                                    <Image
                                        src={cart.image}
                                        rounded
                                        size="mini"
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Header as="h4" image>
                                        <Header.Content>
                                            {cart.name}
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{cart.qty}</Table.Cell>
                                <Table.Cell>
                                    {' '}
                                    &#8377; {cart.qty * cart.price}
                                </Table.Cell>
                                <Table.Cell>
                                    {' '}
                                    <Button
                                        circular
                                        icon="close"
                                        onClick={() =>
                                            removeItemsFromCart(cart.id)
                                        }
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell>Total</Table.HeaderCell>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                            <Table.HeaderCell>
                                {' '}
                                &#8377; {totalCartPrice}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="green"
                    disabled={items.length === 0}
                    onClick={onCheckout}
                >
                    <Icon name="shopping cart" /> Checkout
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CartModal
