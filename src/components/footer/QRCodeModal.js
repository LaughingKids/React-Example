import React,{Component} from 'react';
import BoostrapComponentModal from '../boostrap-component-modal/BoostrapComponentModal';
import $ from 'jquery';

class QRCodeModal extends Component {
	render() {
		var body = '<img src="' + this.props.imageUrl + '"/>';
		var language = helper.readCookie(helper.cookieLangKey);
		var titleContent = helper.getTranslate('qr-code-scan-label',language);
		return(
			<div className="QRCodeModal">
				<BoostrapComponentModal 
					componentID="wechatQrCodeModal"
					modalTitle={titleContent}
					modalBody={body}
					modalFooter=""/>
			</div>
		)
	}
}

module.exports = QRCodeModal;