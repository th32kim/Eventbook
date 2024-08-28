import { Message } from "semantic-ui-react";

interface Props{
    errors: string[] | null;

}

export default function ValidationError({errors}:Props){
    return(
        <Message negative>
            {errors && (
                <Message.List>
                    {errors.map((error, i) => (
                        <Message.Item key={i}>{error}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}