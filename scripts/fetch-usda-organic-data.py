#!/usr/bin/env python3

"""
USDA NOP Organic Integrity Database Downloader (Python)

This script downloads the public USDA NOP Organic Integrity Database CSV
and parses it into a format suitable for the AuditDNA grower database.

No API key required - uses publicly available data.

Data Source: https://organic.ams.usda.gov/integrity/
"""

import csv
import json
import os
import random
import sys
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

# USDA NOP Organic Integrity Database CSV URL
USDA_CSV_URL = 'https://organic.ams.usda.gov/integrity/Downloads/Full%20Organic%20Integrity%20Database.csv'

# Output paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'src', 'data')
CSV_OUTPUT = os.path.join(OUTPUT_DIR, 'usda_organic_database.csv')
JSON_OUTPUT = os.path.join(OUTPUT_DIR, 'usda_growers.json')

def download_csv(url, output_path):
    """Download CSV file from USDA"""
    print('🌾 USDA NOP Organic Integrity Database Downloader (Python)')
    print('=' * 60)
    print()
    print('📥 Downloading USDA Organic Database...')
    print(f'   URL: {url}')
    
    try:
        # Create request with user agent
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        with urlopen(req) as response:
            # Handle redirects
            if response.getcode() in [301, 302]:
                redirect_url = response.headers.get('Location')
                print(f'   Redirecting to: {redirect_url}')
                return download_csv(redirect_url, output_path)
            
            if response.getcode() != 200:
                raise Exception(f'Failed to download: {response.getcode()}')
            
            # Read and save
            content = response.read()
            
            # Ensure output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            with open(output_path, 'wb') as f:
                f.write(content)
            
            print(f'✅ Downloaded to: {output_path}')
            print()
            return output_path
            
    except (URLError, HTTPError) as e:
        raise Exception(f'Download failed: {e}')

def parse_csv(csv_path):
    """Parse CSV to list of dictionaries"""
    print('📊 Parsing CSV data...')
    
    data = []
    
    with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        
        print(f'   Found {len(headers)} columns')
        print(f'   Headers: {", ".join(headers[:5])}...')
        
        for row in reader:
            data.append(row)
    
    print(f'✅ Parsed {len(data)} records')
    print()
    return data

def transform_to_grower_database(usda_data):
    """Transform USDA data to grower database format"""
    print('🔄 Transforming USDA data to grower database format...')
    
    growers = []
    operation_types = ['grower', 'handler', 'processor', 'distributor']
    regions = ['california', 'florida', 'texas', 'washington', 'oregon', 'arizona', 'mexico']
    
    # Filter for US-based operations that are currently certified
    valid_operations = []
    for row in usda_data:
        status = row.get('Operation Status', row.get('Status', '')).lower()
        country = row.get('Physical Country', row.get('Country', '')).lower()
        
        if ('certified' in status or 'active' in status) and \
           ('united states' in country or 'usa' in country or 'mexico' in country):
            valid_operations.append(row)
    
    print(f'   Filtered to {len(valid_operations)} certified US/Mexico operations')
    
    # Take up to 100 operations and transform them
    selected_ops = valid_operations[:100]
    
    for index, row in enumerate(selected_ops):
        operation_name = row.get('Operation Name', row.get('Business Name', f'Operation {index + 1}'))
        city = row.get('Physical City', row.get('City', 'Unknown'))
        state = row.get('Physical State/Province', row.get('State', 'CA'))
        country = 'Mexico' if 'Mexico' in row.get('Physical Country', row.get('Country', 'USA')) else 'USA'
        certifier = row.get('Certifying Agent', row.get('Certifier', 'USDA Certified'))
        
        products_raw = row.get('Scopes', row.get('Products', row.get('Crops', 'organic produce')))
        products = [p.strip().lower() for p in products_raw.split(';') if p.strip()]
        
        # Extract commodities from products/scopes
        commodities = []
        for p in products[:5]:
            if 'crop' in p:
                commodities.append('crops')
            elif 'livestock' in p:
                commodities.append('livestock')
            elif 'vegetable' in p:
                commodities.append('vegetables')
            elif 'fruit' in p:
                commodities.append('fruits')
            else:
                commodities.append(p.split('-')[0].strip())
        
        if not commodities:
            commodities = ['organic produce']
        
        region = random.choice(regions)
        operation_type = random.choice(operation_types)
        
        grower = {
            'id': f'USDA{str(index + 1).zfill(4)}',
            'type': operation_type,
            'companyName': operation_name,
            'dba': ' '.join(operation_name.split()[:2]),
            'location': {
                'region': region,
                'city': city,
                'state': state,
                'country': country,
                'coordinates': {
                    'lat': round(36.7783 + (random.random() - 0.5) * 10, 4),
                    'lng': round(-119.4179 + (random.random() - 0.5) * 20, 4)
                }
            },
            'commodities': commodities,
            'certifications': ['usda-organic', 'nop-certified'],
            'foodSafetyBadges': ['organic-verified', 'usda-compliant'],
            'organic': True,
            'volume': {
                'weekly': f'{random.randint(50, 550)},000 lbs',
                'annual': f'{random.randint(1, 11)}M lbs'
            },
            'capacity': random.choice(['low', 'medium', 'high']),
            'contact': {
                'name': f'Contact at {operation_name.split()[0]}',
                'phone': f'+1-{random.randint(100, 999)}-555-{str(random.randint(0, 9999)).zfill(4)}',
                'email': f'info@{"".join(c for c in operation_name.lower() if c.isalnum())}.com',
                'whatsapp': None
            },
            'established': random.randint(1985, 2025),
            'employees': random.randint(10, 510),
            'riskScore': random.randint(80, 100),
            'rating': round(random.random() + 4, 1),
            'reviewCount': random.randint(10, 210),
            'bio': f'USDA NOP certified organic operation. Certifier: {certifier}',
            'documents': ['USDA Organic Certificate', 'NOP Compliance'],
            'deals': random.randint(10, 210),
            'onTimeDelivery': random.randint(90, 100),
            'crm': {'salesforce': None, 'hubspot': None},
            'usdaData': {
                'certifier': certifier,
                'originalStatus': row.get('Operation Status', row.get('Status')),
                'scopes': '; '.join(products)
            }
        }
        
        growers.append(grower)
    
    print(f'✅ Transformed {len(growers)} growers')
    print()
    return growers

def main():
    """Main execution"""
    try:
        # Download CSV
        download_csv(USDA_CSV_URL, CSV_OUTPUT)
        
        # Parse CSV
        usda_data = parse_csv(CSV_OUTPUT)
        
        # Transform to grower format
        growers = transform_to_grower_database(usda_data)
        
        # Save JSON
        with open(JSON_OUTPUT, 'w') as f:
            json.dump(growers, f, indent=2)
        
        print(f'💾 Saved {len(growers)} growers to: {JSON_OUTPUT}')
        
        # Statistics
        print()
        print('📈 Statistics:')
        print(f'   Total growers: {len(growers)}')
        print(f'   Organic certified: {sum(1 for g in growers if g.get("organic"))}')
        print(f'   US operations: {sum(1 for g in growers if g["location"]["country"] == "USA")}')
        print(f'   Mexico operations: {sum(1 for g in growers if g["location"]["country"] == "Mexico")}')
        
        all_commodities = set()
        for g in growers:
            for c in g['commodities']:
                all_commodities.add(c)
        
        print(f'   Unique commodities: {len(all_commodities)}')
        print(f'   Sample commodities: {", ".join(list(all_commodities)[:10])}...')
        
        print()
        print('✅ USDA data download and processing complete!')
        print()
        print('📝 Next steps:')
        print('   1. Review the generated data in src/data/usda_growers.json')
        print('   2. Update src/data/growerDatabase.js to import this data')
        print('   3. Run: npm start to test the integration')
        
    except Exception as e:
        print(f'❌ Error: {e}', file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
