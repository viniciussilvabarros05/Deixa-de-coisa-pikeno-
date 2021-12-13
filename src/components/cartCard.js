export function CartCard(props) {
    return (
        <>
            <div className="cart-card">
                <div className="nameProduct">
                    <p>{props.item.name}</p>
                    <span>{props.item.value}</span>
                </div>
            </div>
        </>
    )
}