RUBY_ENGINE == 'opal' ? (require 'solr-postprocessor/extension') : (require_relative 'solr-postprocessor/extension')

Asciidoctor::Extensions.register do
  if (@document.basebackend? 'html')
    postprocessor SolrPostprocessor
  end
end
