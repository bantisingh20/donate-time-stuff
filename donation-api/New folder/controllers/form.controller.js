const dbService  = require('../DatabaseHelper/DatabaseHelper');
 
async function getFormConfigByRoute(req, res) {
  const routePath = req._parsedUrl.pathname;
 console.log(routePath)
  try {
    const params = {routePath : routePath}
    var listData; 
    //// Add parameters
    dbService.addkeyandvalue("@userid", 1);
    dbService.addkeyandvalue("@firstname", "Banti Singh");
    const result = await dbService.executeStoredProcedure('SpGetFormConfigByRoute', params);
     
    //console.log('Stored procedure result:', result);

    const form = result[0]; // First item is form metadata

    const fields = result.slice(1) || [];  // All other records after the first are fields

    if (!form || form.length === 0) {
    return res.status(404).json({ message: 'Form not found' });
    }
    
    if (fields.length === 0) {
    return res.status(404).json({ message: 'No fields found for this form' });
    }

  
    if (form.listfunction) {
      try {
        const listResult = await dbService.executeStoredProcedure(form.listfunction);
        
        listData= listResult.slice(0) || [] ; //listResult?.[0];
        console.log(listData)
      } catch (err) {
        console.error('Error executing listFunction:', err.message);
      }
    }


    const response = {
      form,
      fields,
      listData: listData
    };

    console.log(response);
    res.json(response);

  } catch (err) {
    console.error('Error fetching form config:', err);
    res.status(500).json({ message: err });
  }
}

module.exports = { getFormConfigByRoute };
