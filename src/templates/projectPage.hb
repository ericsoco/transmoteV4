<div id="project-page">

	<div id="project-intro">
		<div id="project-intro-header">
			<h2>{{name}}</h2>
			<h5>{{tagline}}</h5>
			<h5>{{role}} &ndash; {{datestamp date}}</h5>
		</div>
		<div id="project-intro-copy">{{{brief}}}</div>
	</div>

{{!-- 	<div id="project-body">
		<div class="item active">
			<div id="project-intro" class="container">
				{{#ifVideo media.[0]}}
					<img src="{{concatPath "projects" id media.[0].poster}}" class="img-responsive" />
				{{else}}
					<img src="{{concatPath "projects" id media.[0].path}}" class="img-responsive" />
				{{/ifVideo}}
				<div id="project-intro-content">
					<div id="project-intro-overlay"></div>
				</div>
			</div>
		</div>

		{{#each media}}
		<div class="item">
			{{#ifVideo this}}
				<div class="container">
					<div class="flex-video widescreen" style="margin: 0 auto;text-align:center;">
						<iframe {{createVimeoEmbed @index}} frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
						</iframe>
					</div>
				</div>
			{{else}}
				<img src="{{concatPath "projects" ../../id path}}" class="img-responsive" />
				{{#if caption}}
					<div class="container">
						<div class="carousel-caption">
							<p class="caption-title">{{{caption}}}</p>
						</div>
					</div>
				{{/if}}
			{{/ifVideo}}
		</div>
		{{/each}}
	</div>
 --}}
</div>