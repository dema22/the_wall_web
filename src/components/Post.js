import {Card, CardContent, Typography} from "@mui/material";
import './Post.css';

export const Post = (props) => {
    return (
        <Card className="post-container">
            <CardContent className="card-container">
                <Typography component="p">
                    Created by {props.author} on {props.time}
                </Typography>
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