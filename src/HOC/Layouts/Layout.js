import React, {Component} from 'react';
import Aux from '../hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    SideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    drawerToggleclicked = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }
    render() {
    return (<Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleclicked}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>)
    }
};

export default Layout;