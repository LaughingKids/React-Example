import React,{Component} from 'react';
import $ from 'jquery';

class BoostrapComponentModal extends Component {
	render(){
		return (
			<div className="modal fade" id={this.props.componentID}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			        <h4 className="modal-title">{this.props.modalTitle}</h4>
			      </div>
			      <div className="modal-body" dangerouslySetInnerHTML={{__html:this.props.modalBody}} />
			      <div className="modal-footer" dangerouslySetInnerHTML={{__html:this.props.modalFooter}} />
			    </div>
			  </div>
			</div>
		)
	}
}

module.exports = BoostrapComponentModal;