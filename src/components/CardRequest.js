
export function CardRequest(props) {
    return (
        <div className="list-request">
            <div className="CardRequest">
                <div>
                    <img src={props.item.img} />
                    <img src={props.item.type} />
                    <p className="desc">{props.item.name}</p>
                    <p className="value">R$ {props.item.value}</p>
                </div>
                <span>Status: <p>Em preparo</p></span>

            </div>
        </div>
    )
}