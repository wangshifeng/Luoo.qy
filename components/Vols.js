// 所有的 vol

import React from 'react';
import reactCSS from 'reactcss';
import Types from './Types';
import Vol from './Vol';


export default class Vols extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.getVolList = this.getVolList.bind(this);
        this.showMoreVol = this.showMoreVol.bind(this);
        this.updateVolListDate = this.updateVolListDate.bind(this);

        this.state = {
            allTypesVolListData: [],
            volListData: [],
            volListDom: []
        }
    }

    componentWillMount() {
        // 渲染之前先获取所有的 vol 的数据
        this.getVolList();
    }

    // 根据不同的 vol 类型切换显示的 vol
    updateVolListDate(type) {
        if (type == undefined) return;

        const volListDom = [];
        // 根据不同的 type 过滤 vol 的数据
        const volListData = filter(this.state.allTypesVolListData, type);
        const max = volListData.length >= 10 ? 10 : volListData.length;
        for (let i=0; i<max; i++) {
            volListDom.push(
                <Vol
                    setBackground={this.props.setBackground}
                    data={volListData[i]}
                    key={i}
                    index={i%10}
                    showVolView={this.props.showVolView}
                />
            )
        }

        this.setState((prevState, props) => ({
            volListData: volListData,
            volListDom: volListDom
        }));

        function filter(data, type) {
            if (type === '全部')
                return data;
            const filterData = [];
            for (let volData of data) {
                if (volData.tag.includes(`#${type}`))
                    filterData.push(volData)
            }
            return filterData
        }
    }

    // 渲染更多的 vol
    showMoreVol() {
        const volListDom = this.state.volListDom;
        const max = this.state.volListDom.length+10 >= this.state.volListData.length ?
            this.state.volListData.length :
            this.state.volListDom.length+10;
        for (let i=this.state.volListDom.length; i<max; i++) {
            volListDom.push(
                <Vol
                    index={i%10}
                    setBackground={this.props.setBackground}
                    data={this.state.volListData[i]}
                    key={i}
                    showVolView={this.props.showVolView}
                />
            )
        }
        this.setState((prevState, props) => ({
            volListDom: volListDom
        }));
    }

    // 获取所有的 vol 的数据
    async getVolList() {
        const data = await this.props.getVolList;
        this.setState((prevState, props) => ({
            volListData: data,
            allTypesVolListData: data
        }));
        this.showMoreVol();
        this.props.setBackground(data[0].cover)
    }

    render() {return(
        <div style={this.style().volsContainer}>
            <Types
                platform={this.props.platform}
                update={this.updateVolListDate}
            />
            <div style={this.style().vols}>
                {this.state.volListDom}
            </div>
            <button
                style={this.style().loadMoreButton}
                onClick={this.showMoreVol}
                className="loadMore"
            >
                {this.state.volListData.length ===
                    this.state.volListDom.length ?
                        'No More' : 'More'
                }
            </button>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            volsContainer: {
                width: '100%',
                height: 'calc(100% - 20px)',
                overflow: 'auto',
                display: 'fixed',
                paddingTop: '20px'
            },
            vols: {
                position: 'relative',
                top: '20px',
                padding: '0 15px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            loadMoreButton: {
                width:'100px',
                height: '40px',
                borderRadius: '40px',
                margin: '30px calc(50% - 50px) 80px calc(50% - 50px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer'
            }
        }
    },this.props, this.state))}
}
