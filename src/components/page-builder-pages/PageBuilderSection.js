import React, {Component} from 'react';
import $ from "jquery";
import FontAwesome from 'react-fontawesome';
import VideoModal from '../video-modal/VideoModal';
import LocationMap from '../LocationMap/LocationMap';
import ServiceProcessSlider from '../serivce-process-slider/ServiceProcessSlider';

class PageBuilderSection extends Component {
	vcBlockFactory() {
		var theSection = this;
		var contentHtml = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		contentHtml += this.props.pageBodyContent;
		return contentHtml;
	}
	homewhyusSectionFactory() {
		var theSection = this;
		var contentHtml = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		var homeLeftReason = $("<div>");
		var homeLeftReasonContent = $("<div>");
		homeLeftReason.addClass("col-lg-6 col-md-6 col-xs-12 col-sm-12");
		homeLeftReasonContent.addClass("whyUsBlock");
		var homeRightReason = $("<div>");
		var homeRightReasonContent = $("<div>");
		homeRightReason.addClass("col-lg-6 col-md-6 col-xs-12 col-sm-12");
		homeRightReasonContent.addClass("whyUsBlock");
		this.props.sectionInfo.home_why_us_reasons.map(function(reason,index) {
//			console.log(reason.reson_content);
			var reasonP = $("<p>");
			reasonP.addClass('whyUs');
			var resonString = $("<span>");
			resonString.text($(reason.reson_content).html());
			reasonP.append(resonString);
			if(reason.reson_position == 'left') {
				homeLeftReasonContent.append(reasonP);
			} else {
				homeRightReasonContent.append(reasonP);
			}
		});
		homeLeftReason.append(homeLeftReasonContent);
		homeRightReason.append(homeRightReasonContent);
		// console.log(homeLeftReasonContent);
		contentHtml += homeLeftReason.prop('outerHTML') + homeRightReason.prop('outerHTML');
		return contentHtml;
	}
	servicereasonsSectionFactory(){
		var theSection = this;
		var reasonsContent = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		//console.log(theSection.props.sectionInfo.service_reasons);
		this.props.sectionInfo.service_reasons.map(function(reason,index){
			var imgLink = helper.imageUrlFactory(reason.reason_image.url);//console.log(imgLink);
			var colClassName = reason.reason_column_class;
			if(reason.column_position.length)
				colClassName += ' imgHoverGroup ' + reason.column_position;
			else 
				colClassName += ' imgHoverGroup full-width-reason-col';
			var subContent = '<div class="' + colClassName + '"">';
			subContent += '<img src="' + imgLink + '" />';
			/* img title cover contents */
			var imgTitleCover = '<div class="reasonImgCover">';
			imgTitleCover += '<div class="coverTitleContainer">';
			imgTitleCover += '<div class="coverTitle">';
			imgTitleCover += '<p id="reasonTitle">' + reason.reason_title + '</p>';
			imgTitleCover +=  "</div>";//coverTitle
			imgTitleCover +=  "</div>";//coverTitleContainer
			imgTitleCover += "</div>"; //imgCover
			subContent += imgTitleCover;
			/* img hover cover contents */
			var imgCover = '<div class="reasonImgCover">';
			imgCover += '<div class="coverContentContainer">';
			imgCover += '<div class="coverContents">';
			imgCover += '<p id="coverReasonTitle">' + reason.reason_title + '</p>';
			imgCover += '<p id="coverReasonDesp">' + reason.reason_description + '</p>';
			imgCover +=  "</div>";//coverContents
			imgCover +=  "</div>";//coverContentContainer
			imgCover += "</div>"; //imgCover
			/* img hover cover contents end */
			subContent += imgCover;
			subContent += '</div>';
			reasonsContent += subContent;
		});
		return reasonsContent;
	}
	pageLinkSectionFactory(){
		var theSection = this;
		var linksContent = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		this.props.sectionInfo.links.map(function(link,index){
			var imgLink = helper.imageUrlFactory(link.link_image);
			var theStyle = 'background-image:url("' + imgLink + '")';
			var tagId = link.link_url.split('/');
			var subContent = '<div class="' + theSection.props.sectionInfo.boostrap_class + '">';
			subContent += "<a href='" + link.link_url + "'>";
			subContent += "<div class='linkGroupContent'>";
			subContent += "<div class='linkIconBlock'>";
			subContent += "<div class='linkIcon' id='"+ tagId[2] +"'style="+theStyle+">";
			subContent += "</div>";/*linkIcon*/
			subContent += '</div>';/*linkIconBlock*/
			subContent += "<p class='readMore'><a href='" + link.link_url + "'>" + link.link_label + "</a></p>";
			subContent += '</div>';/*linkGroupContent*/
			subContent += "</a>";
			subContent += '</div>';
			linksContent += subContent;
		})
		return linksContent;
	}
	pageAccesServiceFactory(){
		var theSection = this;
		var serviceContent = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		this.props.sectionInfo.service_block.map(function(service,index){
			var imgLink = helper.imageUrlFactory(service.service_logo); //console.log(imgLink);
			var sectionStyle = "background-image:url('" + imgLink + "')";
			serviceContent += '<div class="' + service.service_row_class + '">';
			serviceContent += '<p class="serviceLogo" style="' + sectionStyle + '"></p>';
			serviceContent += '<div class="serviceDesp">'+ '<p class="serviceTitle">' + service.service_title + '</p>';
			serviceContent +=  service.service_description + '</div>';
			serviceContent += '</div>';
		})
		return serviceContent;
	}
	pageTimeSectionFactory(){
		var theSection = this;
		var timeFeeContent = '<p class="sectionTitle">' + theSection.props.sectionInfo.section_title +'</p>';
		timeFeeContent += '<div class="' + theSection.props.sectionInfo.boostrap_class + '">';
		timeFeeContent += '<div class="timeFeeRow">';
		timeFeeContent += '<div class="timeFeeLable"><p>' + theSection.props.sectionInfo.time_label;
		timeFeeContent += '</p></div>';
		timeFeeContent += '<div class="timeFeeDesp"><p>' + theSection.props.sectionInfo.time_description;
		timeFeeContent += '</p></div>';
		timeFeeContent += '</div>';
		timeFeeContent += '<div class="timeFeeRow">';
		timeFeeContent += '<div class="timeFeeLable"><p>' + theSection.props.sectionInfo.fee_lable;
		timeFeeContent += '</p></div>';
		timeFeeContent += '<div class="timeFeeDesp">' + theSection.props.sectionInfo.fee_description;
		timeFeeContent += '</div>';
		timeFeeContent += '</div>';
		timeFeeContent += '</div>';
		return timeFeeContent;
	}
	render(){
		// console.log(this.props.pageBodyContent);
		var content;
		var imageLink;
		var sectionTitleBlock = '';
		var sectionPostionClass = "PageBuilderSection evenSection";
		if((this.props.sectionIndex + 1) % 2) {
			sectionPostionClass = "PageBuilderSection oddSection";
		}
		if(this.props.sectionInfo.section_title.length > 1) {
			sectionTitleBlock = "<p class='sectionTitle'>" + this.props.sectionInfo.section_title + "</p>";
		} else {
			sectionTitleBlock = "<p class='sectionTitle'></p>";
		} 
		switch(this.props.sectionInfo.section_type) {
			case 'video':
				content = '<div class="'+ this.props.sectionInfo.boostrap_class + '">';
				content += sectionTitleBlock;
				content += '<p class="videoPlayBtn">';
				content += '<a data-toggle="modal" data-target="#videoModal">';
				content += '<i class="fa fa-play" aria-hidden="true"></i></a></p>';
				content += '</div>';
				break;
			case 'text':
				content = '<div class="'+ this.props.sectionInfo.boostrap_class + '">';
				content += sectionTitleBlock;
				content += this.props.sectionInfo.section_content;
				if(this.props.sectionInfo.section_quick_link.length > 1) {
					content += "<p class='readMore'><a href='" + this.props.sectionInfo.section_quick_link + "'>" + this.props.sectionInfo.more_link_label + "</a></p>";
				}
				content += '</div>';
				break;
			case 'image':
				var imageStyle;
				if(this.props.sectionInfo.section_type === 'image'){
					imageLink = helper.imageUrlFactory(this.props.sectionInfo.section_image);
					imageStyle = "background-image: url('" + imageLink + "')";
				}
				content = '<div class="'+ this.props.sectionInfo.boostrap_class + '" style="' + imageStyle + '">';
				content += '</div>';
				break;
			case 'links':
				content = this.pageLinkSectionFactory();
				break;
			case 'time&fees':
				content = this.pageTimeSectionFactory();
				break;
			case 'accessorial service':
				content = this.pageAccesServiceFactory();
				break;
			case 'servicereasons':
				content = this.servicereasonsSectionFactory();
				break;
			case 'homewhyus':
				content = this.homewhyusSectionFactory();
				break;
			case 'vc-content':
				content = '<div class="'+ this.props.sectionInfo.boostrap_class + '">';
				content += this.vcBlockFactory();
				content += '</div>';
				break;
			default:
				content = '';
				break;
		}
		var sectionStyle;
		if(this.props.sectionInfo.section_type === 'video') {
			var theVideoUrl = this.props.sectionInfo.video_url.replace("watch?v=", "v/");
			imageLink = helper.imageUrlFactory(this.props.sectionInfo.video_holder_image);
			sectionStyle = {
				backgroundImage: 'url(' + imageLink + ')',
			};
			return (
				<div className={sectionPostionClass} id={this.props.sectionId} data-section-type={this.props.type}>
					<div className='videoImg' style={sectionStyle}>
						<div className="container">
							<div className="row" dangerouslySetInnerHTML={{__html:content}} />
						</div>
						<VideoModal videoUrl={theVideoUrl} />
					</div>
				</div>
			)
		} else if(this.props.sectionInfo.section_type === 'serviceprocess'){
			return (
				<div className={sectionPostionClass} id={this.props.sectionId} data-section-type={this.props.type}>
					<ServiceProcessSlider data={this.props.sectionInfo}/>
				</div>
			)
		} else if(this.props.sectionInfo.section_type === 'googlemap'){
			 var mapOps = {
	            zoom:16,
	            scrollwheel:false,
	            navigationControl:false,
	            mapTypeControl:false,
	            scaleControl:false,
	            draggable:false,
	            streetViewControl:false,
	            zoomControl:false,
	            markerIcon:'/assets/images/goldmate-map-marker.png',
	        }
			return(
				<LocationMap 
	                mapOptions={mapOps}
	                locationBlockTitleKey='goldmate-locations-subtitle'/>
			);
		} else {
			if(this.props.sectionInfo.video_holder_image.length) {
				imageLink = helper.imageUrlFactory(this.props.sectionInfo.video_holder_image);
				sectionPostionClass += ' sectionWithBackgroundimg';
				sectionStyle = {
					backgroundImage: 'url(' + imageLink + ')',
				};
			}
			return (
				<div className={sectionPostionClass}  style={sectionStyle} id={this.props.sectionId} data-section-type={this.props.type}>
					<div className="container">
						<div className="row" dangerouslySetInnerHTML={{__html:content}} />
					</div>
				</div>
			)
		}
		
	}
}

module.exports = PageBuilderSection