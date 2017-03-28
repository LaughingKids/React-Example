import React,{Component} from 'react';
import CalculatorContainer from '../calculator/CalculatorContainer';
import CalculatorQueryModal from '../calculator/CalculatorQueryModal';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

class PageHeader extends Component {
	render(){
		if(this.props.headerInfo.length !== 0) {
			var backgroundImg = helper.imageUrlFactory(this.props.headerInfo.header_background);
			var headerStyle = {
				backgroundImage: 'url(' + backgroundImg + ')'
			}
		}
		if(this.props.headerInfo.header_calculator) { 
			/* OTHERS PAGES HEADER CONTENTS */
			if(this.props.pageName != 'home') {
				return (
					<div className="CombineHeader">
						<Breadcrumbs position="pageBuilderHeader" currentTitle={this.props.pageTitle}/>
						<div className="PageHeader HeaderWithCalculator" style={headerStyle}>
							<div className="HeaderContent">
								<div className="ContentGroup">
									<p className="HeaderTitle"><span className='title'>{this.props.headerInfo.header_title}</span></p>
									<p className="HeaderSlogen">{this.props.headerInfo.header_slogen}</p>
								</div>
							</div>
							<CalculatorContainer 
								style='horizontal'/>
						</div>
					</div>
				)
			}
			/* HOME PAGE HEADER CONTENT */
			return (
				<div className="CombineHeader">
					<div className="PageHeader HeaderWithCalculator" style={headerStyle}>
						<div className="HeaderContent">
							<div className="ContentGroup">
								<p className="HeaderTitle"><span className='title'>{this.props.headerInfo.header_title}</span></p>
								<p className="HeaderSlogen">{this.props.headerInfo.header_slogen}</p>
							</div>
						</div>
						<CalculatorContainer 
							style='horizontal'
							moreLabelKey="calculator-home-btn-label"
							moreLink="#wecanhelp"/>
					</div>
				</div>
			)
		} else {
			/* ALL PAGES HEADER CONTENT WITHOUT CALCULATOR */
			return (
				<div className="PageHeader" style={headerStyle}>
					<Breadcrumbs position="pageBuilderHeader" currentTitle={this.props.pageTitle}/>
					<div className='PageHeaderContentBackground'>
						<div className="container">
							<div className="row">
								<div className={this.props.headerInfo.header_content_class} id="headerContent">
									<div id="contentGroup">
										<p className="HeaderTitle"><span className='title'>{this.props.headerInfo.header_title}</span></p>
										<p className="HeaderSlogen" dangerouslySetInnerHTML={{__html: this.props.headerInfo.header_slogen}}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

module.exports=PageHeader;