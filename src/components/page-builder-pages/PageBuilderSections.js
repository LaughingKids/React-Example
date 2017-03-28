import React, {Component} from 'react';
import PageBuilderSection from './PageBuilderSection';

class PageBuilderSections extends Component {
	render(){
		var theSections = this;
		var setions = this.props.sections.map(function(section,index){
			var sectionId = section.section_type + '-' + index;
			var sectionIndex = index;
			if(section.section_id.length !== 0) {
				sectionId = section.section_id;
			}
			if(section.section_type != 'vc-content') {
				return (
					<PageBuilderSection
						sectionInfo = {section}
						sectionId = {sectionId}
						sectionIndex = {sectionIndex}
						type = {section.section_type}
						key = {index}
					/>
				)
			} else {
				return (
					<PageBuilderSection
						sectionInfo = {section}
						sectionId = {sectionId}
						pageBodyContent={theSections.props.pageContent}
						sectionIndex = {sectionIndex}
						type = {section.section_type}
						key = {index}
					/>
				)
			}
			
		})
		return (
			<div className="PageBuilderSections">
				{setions}
			</div>
		)
	}
}

module.exports = PageBuilderSections