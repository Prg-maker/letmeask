import {ReactNode} from "react"
import cx from "classnames"
 
import "./style.scss"

type QuestionProps= {
    content: string;
    author:{
        name:string;
        avatar:string;
    }

    children?: ReactNode
    isAnswered?: boolean
    isHighligted?: boolean


} 

export function Questions({content, author, children, isHighligted = false ,  isAnswered = false }: QuestionProps) {
    return(
        <div className={cx('question', {answered: isAnswered}, {highligted: isHighligted && !isAnswered})}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>

                <div>{children}</div>
            </footer>
        </div>
    )
}