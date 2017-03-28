import React,{Component} from 'react';
import PageBuilderPages from '../../../components/page-builder-pages/PageBuilderPages';
import ContactForm from '../../../components/contactform/ContactForm';

class OverseasAssetAllocation extends Component {
	constructor() {
		super();
		this.state={
			oaaPageMeta:[]
		}
	}
	loadPageContentAndMetaViaServer(){
		let language = helper.readCookie(helper.cookieLangKey);
		var metaQuery = '?with_meta=1';
		$.ajax({
	    	url: '/json-api/restml/' + language +'/page/overseas-asset-allocation' + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(pageRespData) { 
//				console.log(pageRespData.metas);
	    		this.setState({oaaPageMeta:pageRespData.metas});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	componentDidMount(){
		this.loadPageContentAndMetaViaServer();
	}
	render(){
		var subscribeFormId = 152;
		return (
			<div className='OverseasAssetAllocation servicePage'>
				<PageBuilderPages
                    pageName='overseas-asset-allocation' />
                <div className="EnquiryFormSection">
	                <div className="container">
	                	<div className='row'>
	                		<div className="theFormSection">
	                			<div className = "col-md-12 col-lg-12 col-sm-12 col-xs-12">
						      		<p className='enquiryTitle'>{this.state.oaaPageMeta.query_form_label}</p>
							      	<p className='enquiryIntro' dangerouslySetInnerHTML={{__html:this.state.oaaPageMeta.query_form_intro}}/>
						      		<div className="EnquiryForm">
						      			 <ContactForm 
								        	id={subscribeFormId}
								        	name="enquiry"/>
						      		</div>
						      	</div>
						      	<div className="clear"/>
	                		</div>
					    </div>
	                </div>
                </div>
			</div>
		)
	}
}

module.exports = OverseasAssetAllocation;