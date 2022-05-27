import {Card, CardContent, Typography} from "@mui/material";
import './Post.css';
// The post receives a showAuthor props (boolean), that indicates if we need to show the author when creating a new post or not.
export const Post = (props) => {
    return (
        <Card className="post-container">
            <CardContent className="card-container">
                {props.showAuthor ?
                    <Typography component="p">
                        Created by {props.author} on {props.time}
                    </Typography>
                    :
                    <Typography component="p">
                        You post this on {props.time}
                    </Typography>
                }
                <Typography component="p">
                    Title: {props.title}
                </Typography>
                <Typography className="content" paragraph color="text.secondary">
                    Content: {props.content}
                </Typography>
            </CardContent>
        </Card>
    );
}