<div class="project-thumb-list">
	{{#each projects}}
		<a href="{{concatPath "projects" id}}">
			{{!-- <div class="project-thumb" data-project="{{id}}" style="background-image:url({{concatPath "projects" id media.[0].path}})"> --}}
			<div class="project-thumb{{#if featured}} featured{{/if}}" data-project="{{id}}">
				<h3 class="project-thumb-title">{{name}}</h3>
				{{#ifEmbed media.[0]}}
					{{#if media.[0].poster}}
						<img src="{{concatPath "projects" id media.[0].poster}}" class="img-responsive" />
					{{else}}
						<div class="img-responsive videoPosterWarn">
							If first image is a video, include { 'poster': 'imgpath' }.
						</div>
					{{/if}}
				{{else}}
					<img src="{{concatPath "projects" id media.[0].path}}" class="img-responsive" alt="{{name}}" />
				{{/ifEmbed}}
			</div>
		</a>
	{{/each}}
</div>
