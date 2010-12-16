require 'rubygems'
require 'rexml/document'
require 'json'

json = []
Dir.glob('data/*dsd*').each { |line|
        filename = line.strip
        dataset_id = filename.match(/^data\/([^.]*)/)[1]
        
        doc = REXML::Document.new File.open(filename.strip, 'r')
        
        doc.elements.each("//Structure/KeyFamilies/structure:KeyFamily[@id='" + dataset_id + "_DSD']/structure:Components/structure:Dimension") { |dimension|

                ref = dimension.attributes['conceptRef']
                if ref != 'FREQ' and ref != 'geo':
                        codelist = dimension.attributes['codelist']
                        elem_cl = doc.elements["//Structure/CodeLists/structure:CodeList[@id='" + codelist + "']"]
                        cl_name = elem_cl.elements["structure:Name[@xml:lang='en']"].text.to_s
                        cl_codes = {}
                        elem_cl.elements.each("structure:Code") { |code|
                                cl_codes[code.attributes['value']] = code.elements["structure:Description[@xml:lang='en']"].text.to_s
                        }
                        json << { 'dataset' => dataset_id, 'indicatorLabel' => cl_name, 'codelist' => cl_codes , 'indicator' => ref}
                end
        }
}
File.open('indicators.json', "w"){|f| f.write(json.to_json)}

