interface IErrorMessageProps {
    isShowingError: boolean,
    errorMessage: string
}

export const ErrorMessage = (props: IErrorMessageProps) => {

    if (!props.isShowingError)
        return null;

    return <p className="text-red-500 text-center">
        {props.errorMessage}
    </p>
}