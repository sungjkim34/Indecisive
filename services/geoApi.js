export const getZipcode = (lat, long) => {
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyALc9CpCGnJwxm6hA_ggn4_G7u-Dcn6oKM`;
    return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
            let zip = "";
            responseJson.results[0].address_components.map(component => {
               if(component.types[0] === "postal_code"){
                   zip = component.long_name;
               }
            });
            // const length = responseJson.results[0].address_components.length;
            // const zip = responseJson.results[0].address_components[length-1].long_name;
            return zip;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const getBusinesses = (zipCode) => {
    const uri = `https://api.yelp.com/v3/businesses/search?oauth_consumer_key=M-PTNWdQvMKy7_9nC3Up7w&oauth_token=3rIzS_VOnvoFRQ_Ro1TB9gYts_29YmVrHyPaMlu0jUBvEcCC4EiUvyrNhK3gChxNVPRn3XJjhv8KMfXPkaSKMZtj5eYLq0fn0AF4ssf4WkcX3KErwiLKDzyj0E90WXYx&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1500795031&oauth_nonce=5NmEGc&oauth_version=1.0&oauth_signature=DsbH6JJUFelCJgi+QrZuFE9Ryd4=&location=${zipCode}&categories=food&radius=16093&open_now=true`;
    const headers = {
        Authorization: 'Bearer 3rIzS_VOnvoFRQ_Ro1TB9gYts_29YmVrHyPaMlu0jUBvEcCC4EiUvyrNhK3gChxNVPRn3XJjhv8KMfXPkaSKMZtj5eYLq0fn0AF4ssf4WkcX3KErwiLKDzyj0E90WXYx'
    };
    return fetch(uri, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 3rIzS_VOnvoFRQ_Ro1TB9gYts_29YmVrHyPaMlu0jUBvEcCC4EiUvyrNhK3gChxNVPRn3XJjhv8KMfXPkaSKMZtj5eYLq0fn0AF4ssf4WkcX3KErwiLKDzyj0E90WXYx'
        }})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        })
}