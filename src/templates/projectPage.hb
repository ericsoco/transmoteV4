<div id="project-page">

	<div id="project-header">
		<h2>{{name}}</h2>
		<h5>{{tagline}}<br>{{role}} &ndash; {{datestamp date}}</h5>
		<div id="project-desc">{{{brief}}}</div>
	</div>

	<div id="project-body">
		<ul class="project-media">
		{{#each media}}
			<li>
				{{#ifEmbed this}}
					<div class="container">
						{{#ifFlashEmbed this}}
							{{{createEmbed @index}}}
						{{else}}
							<iframe {{createEmbed @index}} frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
						{{/ifFlashEmbed}}
					</div>
				{{else}}
					<a href="{{concatPath "projects" ../../id path}}"><img src="{{concatPath "projects" ../../id path}}" {{#if ./alt}}alt="{{./alt}}" {{/if}}/></a>
				{{/ifEmbed}}
				{{#if caption}}
					<p class="caption-title">{{{caption}}}</p>
				{{/if}}
			</li>
		{{/each}}
		</ul>
	</div>

</div>