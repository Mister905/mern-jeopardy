import React, { Component } from 'react'

class Category extends Component {
    render() {
        const { title } = this.props;
        return (
            <div>
                <div className="card custom-card category-card jeopardy-blue">
                    <div className="card-content custom-card-content">
                        <span className="card-title center-align jeopardy-white-text flow-text bold-text category-title">{ title }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Category;