interface ISuccessMessageProps {
    isShowingSuccess: boolean,
    successMessage: string
}

export const SuccessMessage = (props: ISuccessMessageProps) => {

    if (!props.isShowingSuccess)
        return null;

    return <p className="text-green-500 text-center">
        {props.successMessage}
    </p>
}