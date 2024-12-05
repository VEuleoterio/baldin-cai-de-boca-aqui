interface NotFoundProps {
    principalMessage: string
    secondaryMessage: string
}

export const NotFound = (props: NotFoundProps) => {
    return (
    <div className="flex flex-col justify-center align-middle">
        <span>{props.principalMessage}</span>
        <span>{props.secondaryMessage}</span>
    </div>
    )
}