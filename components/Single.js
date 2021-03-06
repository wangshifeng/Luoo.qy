// 单曲

import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class Single extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const playButton = this.refs.playButton;
        // 切换 button 的 class 以显示动画
        playButton.className = 'playSingleButton clicked';
        setTimeout(() => {
            playButton.className = 'playSingleButton';
        }, 600);
        // 播放该single
        this.props.play();
    }

    render() {return(
        <div
            className={`single single${this.props.index}`}
            style={this.style().single}
        >
            <div style={this.style().playContainer}>
                <img
                    ref={'playButton'}
                    className="playSingleButton"
                    onClick={this.handleClick}
                    style={this.style().playButton}
                    src="../pic/Play.svg"
                />
                <p style={this.style().name}>
                    {this.props.data ? this.props.data.name : 'Loading...'}
                </p>
                <p style={this.style().artist}>
                    {this.props.data ? this.props.data.artist : 'Loading...'}
                </p>
            </div>
            <img
                className="singleCover"
                style={this.style().cover}
                src={this.props.data ?
                    this.props.data.cover :
                    '../pic/singleCover.jpg'}
            />
            <div style={this.style().desc}>
                <p>{this.props.data ? this.props.data.description : 'Loading...'}</p>
                <img style={this.style().logo} src="../pic/logo_white.png"/>
                <p style={this.style().date}>
                    {this.props.data ?
                        `${this.props.data.recommender} · ${this.props.data.date}` :
                        'Loading...'}
                </p>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            single: {
                width: '90%',
                height: 'auto',
                margin: '30px 5% 60px 5%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0px 0px 5px rgba(34, 34, 34, 0.3)',
            },
            playContainer: {
                width: '100%',
                height: '60px',
                fontWeight: 'bold',
                marginBottom: '8px',
                letterSpacing: '0.1em'
            },
            playButton: {
                width: '35px',
                height: '100%',
                float: 'left',
                marginRight: '15px',
                cursor: 'pointer',

            },
            name: {
                fontSize: '1.5em',
                display: 'block',
            },
            artist: {
                fontSize: '1.2em'
            },
            cover: {
                width: '45%',
                height: 'auto',
                display: 'inline-block',
                borderRadius: '8px',
            },
            desc: {
                width: '50%',
                display: 'inline-block',
                fontSize: '0.85em',
            },
            logo: {
                width: '15px',
                height: 'auto',
                display: 'inline-block',
                margin: '8px 10px 0 0',
                position: 'relative',
                top: '3px'
            },
            date: {
                fontWeight: 'normal',
                fontFamily: 'STSongti-SC-Regular',
                display: 'inline-block'
            }
        }
    }, this.props, this.state))}
}