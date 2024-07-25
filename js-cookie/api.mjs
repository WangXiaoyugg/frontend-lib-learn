import assign from './assign.mjs'
import defaultConverter from './converter.mjs'

function init(converter, defaultAttributes) {

    function set(name, value, attributes) {
        if (typeof document === 'undefined') {
            return;
        }

        attributes = assign({}, defaultAttributes, attributes);
        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }

        if (attributes.expires){
            attributes.expires = attributes.expires.toUTCString();
        }

        name = encodeURIComponent(name)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape);

        let stringifiedAttributes = '';
        for (const attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue;
            }
            stringifiedAttributes += '; ' +attributeName;

            if (attributes[attributeName] === true) {
                continue;
            }

            stringifiedAttributes += '=' + attributes[attributeName].split(";")[0];
        }
        return (document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes);

    }

    function get() {
        if (typeof document === 'undefined' || (arguments.length && !name)) {
            return;
        }

        let cookies  = document.cookie ? document.cookie.split("; ") : [];
        let jar = {};

        for (let i = 0; i < cookies.length; i++) {
            const parts = cookies[i].split("=");
            const value = parts.slice(1).join("=");

            try {
                let found = decodeURIComponent(parts[0]);
                if (!(found in jar)) {
                    jar[found] = converter.read(value, found);
                }
                if (name == found) {
                    break;
                }
            } catch {
                // Do nothing;
            }
        }
        return name ? jar[name] : jar;

    }
    return Object.create(
        {
            set,
            get,
            remove: function (name, attributes) {
                set(name, '', assign({}, attributes, { expires: -1}));
            },
            withAttributes: function(attributes) {
                return init(this.converter, assign({}, this.defaultAttributes, attributes));
            },
            withConverter: function(converter) {
                return init(assign({}, this.converter, converter), this.attributes);
            }    
        },
        {
            attributes: { value: Object.freeze(defaultAttributes) },
            converter: { value: Object.freeze(converter)}


        }
    )
}

export default init(defaultConverter, { path: '/' })