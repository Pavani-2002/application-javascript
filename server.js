const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

const { initializeLedger, getAllAssets, createAsset, readAsset,AssetExists, updateAsset} = require('./try.js');

// Initialize the ledger
initializeLedger()
    .then(() => {
        // Start your server once the ledger is initialized
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    
    
app.get('/api/getAllAssets', async (req, res) => {
  try{
    const assetsResult = await getAllAssets();
    res.json({ assets: assetsResult.toString() });
            } catch (error) {
                console.error('Error getting all assets:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
  });

  // Endpoint to create an asset

  app.post('/api/createAsset', async (req, res) => {
    const { id, color,size, owner, appraisedValue} = req.body;
    if (!owner || !color || !size || !appraisedValue || !id) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    try {
        await createAsset(id, color, size,owner, appraisedValue);
        res.json({ message: 'Asset created successfully' });
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
    // Your backend logic to generate the result

  // Send the result as a JSON response
  //const result1 =  initializeLedger.contract.evaluateTran'GetAllAssets');
app.get('/api/ReadAsset/:id', async (req, res) => {
    const assetId = req.params.id;
    try {
        const assetResult = await readAsset(assetId);
        const assetData = JSON.parse(assetResult.toString());
        res.json(assetData);
    } catch (error) {
        console.error('Error getting asset (asset may not be present) ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/api/ExistAsset/:id', async (req, res) => {
//     const assetId = req.params.id;
//     try {
//         const assetResult = await AssetExists(assetId);
//         res.json(JSON.parse(assetResult.toString()));
//     } catch (error) {
//         console.error('Error getting asset:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.post('/api/updateAsset/:id', async (req, res) => {
    const { id, color,size, owner, appraisedValue} = req.body;
    if (!owner || !color || !size || !appraisedValue || !id) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    try {
        await updateAsset(id, color, size,owner, appraisedValue);
        res.json({ message: 'Asset updated successfully' });
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// app.post('/api/updateAsset', async (req, res) => {
//     const { id, color,size, owner, appraisedValue} = req.body;
//     if (!owner || !color || !size || !appraisedValue || !id) {
//         res.status(400).json({ error: 'Missing required parameters' });
//         return;
//     }

//     try {
//         await updateAsset(id, color, size,owner, appraisedValue);
//         res.json({ message: 'Asset updated successfully' });
//     } catch (error) {
//         console.error('Error creating asset:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/api/updateAsset/:id', async (req, res) => {
//     const assetId = req.params.id;
//     const { property, newValue } = req.body;

//     if (!property) {
//         res.status(400).json({ error: 'Missing required parameter: property' });
//         return;
//     }

//     try {
//         // Get the current values of the asset
//         const oldValues = await readAsset(assetId);
//         console.log(oldValues);
//         const x=oldValues.Color;
//         console.log(x);
//         if (!oldValues) {
//             res.status(404).json({ error: 'Asset not found' });
//             return;
//         }

//         // Create an object to hold the updated values
//         const updatedValues = {
//             color: property === 'color' ? (newValue || oldValues.color) : oldValues.color,
//             size: property === 'size' ? (newValue || oldValues.size) : oldValues.size,
//             owner: property === 'owner' ? (newValue || oldValues.owner) : oldValues.owner,
//             appraisedValue: property === 'appraisedValue' ? (newValue || oldValues.appraisedValue) : oldValues.appraisedValue
//         };

//         // Update the asset with the new values
//         await updateAsset(assetId, updatedValues.color, updatedValues.size, updatedValues.owner, updatedValues.appraisedValue);

//         res.json({ message: 'Asset updated successfully', updatedValues });
//     } catch (error) {
//         console.error('Error updating asset:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// });


})
.catch(error => {
    console.error('Failed to initialize ledger:', error);
});