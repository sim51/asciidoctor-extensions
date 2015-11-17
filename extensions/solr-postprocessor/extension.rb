require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
require 'rubygems'
require 'rsolr'

class SolrPostprocessor < Asciidoctor::Extensions::Postprocessor
  def process document, output

    solr_default_fields = ['doctitle','description','tag','author','lang']
    solr_fields = []
    if (document.attr? 'solr-attrs')
      solr_fields = (document.attr 'solr-attrs').split(";")
    end
    solr_url = 'http://localhost:8983/solr'
    if (document.attr? 'solr-url')
      solr_url = document.attr 'solr-url'
    end

    # Object to index
    object = {}
    object['id'] = document.attr 'docfile'

    puts document.attr('application-path')

    # Url of output file
    if (document.attr? 'application-path')
      url = document.attr('outfile')
      url = url.sub(document.attr('application-path'), '')
      object['url'] = url
    else
      object['url'] = 'file://' + document.attr('outfile')
    end
    # Url of source file
    if (document.attr? 'application-path')
      url = document.attr('docfile')
      url = url.sub(document.attr('application-path'),'')
      object['source_url'] = url
    else
      object['source_url'] = 'file://' + document.attr('docfile')
    end
    object['content'] = document.content
    object['date'] = document.attr('docdate') + 'T' + document.attr('doctime')[0..8] + 'Z'
    solr_default_fields.map { |x|
      if (document.attr? x)
        object[x] = document.attr x
      end
    }

    # Custom solr fields
    solr_fields.map { |x|
      if (document.attr? x)
        object[x] = document.attr x
      end
    }

    # Adding url if there is application

    # sending document to solr
    solr = RSolr.connect :url => solr_url
    solr.add object
    solr.commit

    output
  end
end
