import React,{Component} from 'react';

class VideoModal extends Component {
	stopPlay() {
		var src = $(".VideoModal iframe").attr('src');
		$(".VideoModal iframe").attr('src',"");
		$(".VideoModal iframe").attr('src',src);
	}
	render(){
		return (
			<div className="VideoModal">
				<div className="modal fade" id="videoModal" role="dialog" aria-labelledby="videoModal" aria-hidden="true">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-body">
				        <button type="button" onClick={()=>this.stopPlay()} className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

module.exports = VideoModal

// console.log(this.state.videoUrl);
/*
	<div>
	    <iframe width="768px" height="576px" src={this.props.videoUrl}></iframe>
	</div>
 */