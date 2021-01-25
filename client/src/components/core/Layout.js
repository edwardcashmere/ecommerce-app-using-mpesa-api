import React from 'react';
import Menu from '../core/Menu';
import Alert  from '../core/Alert';

const Layout = ({title="Title", description="Descrption",className,children}) => {
    return (
        <div>
            <Menu/>
            <div className="bg-light p-5">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <Alert/>

            <div className={className}>{children}</div>
        </div>
    )
}

export default Layout
