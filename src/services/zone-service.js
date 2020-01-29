
/**
 * Updates the zone file
 *
 * @param {ZoneFile} zoneFile The zone file
 * @return {Promise} A promise resolving to the updated zone file
 */
export async function updateZone(zoneFile) {
  return fetch('api/zone', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(zoneFile),
  }).then((r) => {
    if (r.status === 200) {
      return r.json();
    }

    return r.text()
        .then((t) => Promise.reject(JSON.stringify(t)));
  });
}

/**
 * Gets the zone file
 *
 * @return {Promise} A promise resolving to the zone file
 */
export async function getZone() {
  return fetch('api/zone').then((r) => {
    if (r.status === 200) {
      return r.json();
    }

    return r.text()
        .then((t) => Promise.reject(JSON.stringify(t)));
  });
}
