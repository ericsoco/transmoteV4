<div id="project-thumb-list">
	{{#each projects}}
		<a href="{{concatPath "projects" id}}" class="project-thumb-link">
			{{!-- <div class="project-thumb" data-project="{{id}}" style="background-image:url({{concatPath "projects" id media.[0].path}})"> --}}
			<div class="project-thumb" data-project="{{id}}">
				<div class="project-thumb-banner"></div>
				<h3 class="project-thumb-title">{{name}}</h3>
				{{#ifVideo media.[0]}}
					{{#if media.[0].poster}}
						<img src="{{concatPath "projects" id media.[0].poster}}" class="img-responsive" />
					{{else}}
						<div class="img-responsive videoPosterWarn">
							If first image is a video, include { 'poster': 'imgpath' }.
						</div>
					{{/if}}
				{{else}}
					<img src="{{concatPath "projects" id media.[0].path}}" class="img-responsive" />
				{{/ifVideo}}
			</div>
		</a>
	{{/each}}
</div>
