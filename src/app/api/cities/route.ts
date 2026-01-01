import { NextResponse } from 'next/server';
import { getAllCities, getCityById, updateCityStatus, createCity, deleteCity } from '@/lib/cms/city';
import { CMSCity } from '@/lib/cms/types';
import { protectAdminRoute } from '@/lib/auth';

export async function GET(request: Request) {
  // Skip authentication for GET requests in development
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const authResponse = protectAdminRoute(request);
    if (authResponse) return authResponse;
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Get single city
      const city = await getCityById(id);
      return NextResponse.json(city);
    } else {
      // Get all cities
      const cities = await getAllCities();
      return NextResponse.json(cities);
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Require authentication for POST requests
  const authResponse = protectAdminRoute(request);
  if (authResponse) return authResponse;
  
  try {
    const cityData = await request.json();
    const newCity = await createCity(cityData);
    return NextResponse.json(newCity, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create city' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  // Require authentication for PUT requests
  const authResponse = protectAdminRoute(request);
  if (authResponse) return authResponse;
  
  try {
    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'City ID is required' },
        { status: 400 }
      );
    }

    // Handle status updates
    if ('status' in updateData) {
      const updatedCity = await updateCityStatus(
        id,
        updateData.status,
        updateData.changedBy || 'api'
      );
      return NextResponse.json(updatedCity);
    }

    // For other updates, we'd need to implement a more comprehensive update function
    return NextResponse.json(
      { error: 'Only status updates are currently supported' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update city' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  // Require authentication for DELETE requests
  const authResponse = protectAdminRoute(request);
  if (authResponse) return authResponse;
  
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'City ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCity(id);
    
    if (success) {
      return NextResponse.json(
        { success: true, message: `City ${id} deleted successfully` }
      );
    } else {
      return NextResponse.json(
        { error: `Failed to delete city ${id}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete city' },
      { status: 500 }
    );
  }
}